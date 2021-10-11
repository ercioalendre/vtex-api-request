import AppError from "@shared/errors/AppError";
import { Job, Queue, QueueEvents, QueueScheduler } from "bullmq";

export const connection = {
  port: Number(process.env.REDIS_PORT) || 0,
  host: process.env.REDIS_HOST || "",
  password: process.env.REDIS_PASS || "",
};

export default class CreateQueue {
  static numOfCreatedInstances: number;
  constructor(queueName: string, data: Record<string, unknown>) {
    if (CreateQueue.maxInstancesReached()) {
      throw new AppError("Maximum instances reached! Please try again in a few seconds.");
    }

    CreateQueue.execute(queueName, data);
  }

  private static maxInstancesReached(): boolean {
    if (!this.numOfCreatedInstances) this.numOfCreatedInstances = 0;

    return ++this.numOfCreatedInstances > (Number(process.env.BULLMQ_MAX_INSTANCES) || 1);
  }

  private static async execute(
    queueName: string,
    data: Record<string, unknown>,
  ): Promise<Job | boolean> {
    new QueueScheduler(queueName, {
      connection,
    });

    const queue = new Queue(queueName, {
      connection,
      defaultJobOptions: { attempts: 10, backoff: { type: "fixed", delay: 5000 } },
    });

    const queueEvents = new QueueEvents(queueName, { connection });
    queueEvents.on("completed", () => {
      queue.close();
      this.numOfCreatedInstances = 0;
    });

    return await queue.add(queueName, data, { delay: 1000 });
  }
}

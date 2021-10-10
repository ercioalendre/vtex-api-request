import { Job, Queue } from "bullmq";

export const connection = {
  port: Number(process.env.REDIS_PORT) || 0,
  host: process.env.REDIS_HOST || "",
  password: process.env.REDIS_PASS || "",
};

export default class CreateQueue {
  static async execute(queueName: string, data: Record<string, unknown>): Promise<Job> {
    const queue = new Queue(queueName, {
      connection,
    });

    return await queue.add(queueName, data);
  }
}

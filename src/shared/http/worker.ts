import "dotenv/config";
import { Job, Worker } from "bullmq";
import { connection } from "@providers/Queue.provider";
import * as jobs from "src/jobs";

const concurrency = Number(process.env.BULLMQ_CONCURRENCY) || 1;

Object.entries(jobs).forEach(([queueName, jobClass]) => {
  const worker = new Worker(
    queueName,
    async (job: Job) => {
      jobClass.handle(job.data);
    },
    {
      connection,
      concurrency,
      limiter: { max: 1, duration: 1000 },
    },
  );

  worker.on("completed", job => console.log(`Completed job ${job.id} of ${job.name} successfully`));
  worker.on("failed", (job, err) => console.log(`Failed job ${job.id} of ${job.name} with ${err}`));
  worker.on("error", err => console.log(`Failed with ${err}`));
});

console.log("[Worker] listening for jobs");

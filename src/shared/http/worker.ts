import "dotenv/config";
import { Job, Worker } from "bullmq";
import { connection } from "@shared/http/providers/Queue.provider";
import * as jobs from "src/jobs";

const concurrency = Number(process.env.BULLMQ_CONCURRENCY) || 1;

Object.entries(jobs).forEach(([queue, jobClass]) => {
  const worker = new Worker(
    queue,
    async (job: Job) => {
      jobClass.handle(job.data);
    },
    {
      connection,
      concurrency,
    },
  );

  worker.on("completed", job => console.log(`Completed job ${job.id} of ${job.name} successfully`));
  worker.on("failed", (job, err) => console.log(`Failed job ${job.id} of ${job.name} with ${err}`));
  worker.on("error", err => console.log(`Failed with ${err}`));
});

console.log("[Worker] listening for jobs");

import Queue from "bull";
import GenerateReportJob from "src/jobs/GenerateReport.job";

const redis = {
  port: Number(process.env.REDIS_PORT) || 0,
  host: process.env.REDIS_HOST || "",
  password: process.env.REDIS_PASS || "",
};

const queue = new Queue(GenerateReportJob.key, { redis });

queue.on("active", job => {
  console.log("Job active", job.data);
});

queue.on("error", job => {
  console.log("Job error", job);
});

queue.on("failed", job => {
  console.log("Job failed", job);
});

queue.on("completed", job => {
  console.log("Job completed", job.data);
});

export default queue;

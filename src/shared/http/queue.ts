import "dotenv/config";
import Queue from "@shared/http/providers/Queue.provider";
import GenerateReportJob from "src/jobs/GenerateReport.job";

Queue.process(GenerateReportJob.handle);

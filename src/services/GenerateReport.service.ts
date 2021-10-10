import CreateQueue from "@shared/http/providers/Queue.provider";

class GenerateReportService {
  public async execute(email: string) {
    await CreateQueue.execute("GenerateReport", { email });

    console.log(`Enqueued a report request to be sent to ${email}`);
  }
}

export default new GenerateReportService();

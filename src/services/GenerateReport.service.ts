import Queue from "@shared/http/providers/Queue.provider";
import { Job } from "bull";

class GenerateReportService {
  public async execute(email: string): Promise<Job> {
    // const user = {
    //   id: 123,
    //   name: "Ercio Alendre",
    //   email: "ercio.alendre@gmail.com",
    //   password: "teste123",
    // };

    const sendMail = await Queue.add({ email });

    // console.log(sendMail);
    return sendMail;
  }
}

export default new GenerateReportService();

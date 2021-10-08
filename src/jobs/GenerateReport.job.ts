import Mail from "@shared/http/providers/Mail.provider";
import { Job } from "bull";

export default {
  key: "GenerateReport",
  async handle({ data }: Job): Promise<void> {
    await Mail.sendMail({
      from: "VTEX API Request <do-not-reply@vtex-api-request.com",
      to: `${data.email} <${data.email}>`,
      subject: "Relatório de Produtos",
      html: `Olá, ${data.email}!
      Segue abaixo o relatório de produtos.`,
    });
  },
};

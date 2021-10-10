import Mail from "@shared/http/providers/Mail.provider";

export default class SendEmailJob {
  static async handle(data: Record<string, unknown>): Promise<void> {
    const { email, productsFormated, productsQuantity } = data;

    await Mail.sendMail({
      from: "VTEX API Request <do-not-reply@vtex-api-request.com",
      to: `${email} <${email}>`,
      subject: "Relatório de produtos",
      html: `Olá, ${email}!<br /><br />
      Foram encontrados em nossa base de dados um total de ${productsQuantity} produtos.<br />
      <br />
      Segue abaixo a lista com os produtos encontrados:<br /><br />
      ${productsFormated}<br /><br />
      Obrigado por utilizar os nossos serviços!`,
    });
  }
}

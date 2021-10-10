import CreateQueue from "@shared/http/providers/Queue.provider";
import axios from "axios";

export default class GenerateReportJob {
  static async handle(jobData: Record<string, unknown>): Promise<void> {
    const products: unknown[] = [];
    await axios({
      method: "get",
      url: "https://vtexstore.codeby.com.br/api/catalog_system/pub/products/search?_from=1&_to=50&O=OrderByNameASC",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
    })
      .then(response => {
        const { data } = response;
        Object.values(data).forEach(val => {
          const { productName } = val as Record<string, unknown>;
          products.push(productName);
        });
      })
      .catch(error => {
        console.log(error);
      });

    const email = jobData.email;
    const productsQuantity = products.length;
    const parsedProducts = products.map(product => {
      return `${product}<br />`;
    });
    const productsFormated = parsedProducts.join(" ");

    const dataToSend = {
      email,
      productsFormated,
      productsQuantity,
    };

    await CreateQueue.execute("SendEmail", dataToSend);
  }
}

import { Request, Response } from "express";
import renderPage from "@shared/http/providers/renderPage.provider";
import GenerateReportService from "@services/GenerateReport.service";

export default class MainController {
  static async index(req: Request, res: Response): Promise<void> {
    return res.render("main", {
      page: "email-box",
      msgType: "",
      msgContent: "",
      inputError: "",
      formData: {},
    });
  }

  static async generateReport(
    req: Request,
    res: Response,
  ): Promise<Response | boolean | undefined> {
    const message = res.locals.message;

    if (message) {
      if (message.msgContent) {
        const { msgContent, inputError } = res.locals.message;
        renderPage(msgContent, inputError, res, "email-box", "error", 401);
        return false;
      }
    }

    const { email } = req.body;
    const generateReport = await GenerateReportService.execute(email);

    if (generateReport) {
      renderPage(
        "Relatório gerado com sucesso! Em breve você irá recebê-lo no e-mail informado.",
        "",
        res,
        "email-box",
        "success",
        200,
      );
    } else {
      renderPage(
        "Não foi possível gerar o relatório! Por favor, tente novamente mais tarde.",
        "",
        res,
        "email-box",
        "error",
        200,
      );
    }
  }
}

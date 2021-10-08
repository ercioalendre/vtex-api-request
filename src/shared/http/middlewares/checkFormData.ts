import { NextFunction, Request, Response } from "express";

export default function checkFormData(req: Request, res: Response, next: NextFunction): void {
  const { email } = req.body;
  const regEmail = new RegExp("^[^@\\s]+@[^@\\s]+\\.+[^@\\s]{2,}$");
  if (!regEmail.test(email)) {
    res.locals.message = {
      msgType: "error",
      msgContent: "O e-mail inserido é inválido.",
      inputError: "email",
    };
  }
  res.locals.formData = {
    email,
  };
  next();
}

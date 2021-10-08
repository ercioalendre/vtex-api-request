import nodemailer from "nodemailer";

const host = process.env.MAIL_SERVICE_HOST || "smtp.mailtrap.io";
const port = Number(process.env.MAIL_SERVICE_PORT) || 2525;
const user = process.env.MAIL_SERVICE_AUTH_USER || "";
const pass = process.env.MAIL_SERVICE_AUTH_PASS || "";

export default nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass,
  },
});

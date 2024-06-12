"use server";

import { ReactElement, JSXElementConstructor } from "react";
import { render } from "@react-email/render";
var nodemailer = require("nodemailer");

type SendEmailParams = {
  html: ReactElement<any, string | JSXElementConstructor<any>>;
  targetEmail: string;
  subject: string;
};

export default async function sendEmail({ html, targetEmail, subject }: SendEmailParams) {
  const response: any = { data: null, error: null };

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_AUTH_USER,
      pass: process.env.SMTP_AUTH_PASS,
    },
  });

  try {
    response.data = await transporter.sendMail({
      to: targetEmail,
      from: process.env.SMTP_ADMIN_EMAIL,
      subject: subject,
      html: render(html),
    });
  } catch (error) {
    response.error = error;
  }

  return response;
}

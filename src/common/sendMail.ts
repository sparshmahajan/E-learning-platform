import { mailer } from "../config/nodeMailer";
import { InternalServerError } from "./errors";

export const sendMail = async (to: string, subject: string, text: string) => {
  try {
    await mailer.sendMail({
      from: process.env.MAIL_SENDER,
      to,
      subject,
      text,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email: ", error);
    throw new InternalServerError("Error sending email");
  }
};

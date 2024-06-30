import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

const { EMAIL_USER, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT } = process.env;

interface EmailOptions {
  email: string;
  subject: string;
  text: string;
}

const sendEmail = async ({ email, subject, text }: EmailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      secure: true,
      port: Number(EMAIL_PORT),
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject,
      text,
    });
  } catch (error) {
    console.error(error);
  }
};

export default sendEmail;

import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

const { EMAIL_USER, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT } = process.env;

interface EmailOptions {
  email: string;
  subject: string;
  text: string;
}

/**
 * Envía un email utilizando las opciones especificadas.
 *
 * @param {EmailOptions} options - Un objeto que contiene las opciones de email.
 * @param {string} options.email - La dirección de email del destinatario.
 * @param {string} options.subject - El asunto del email.
 * @param {string} options.text - El cuerpo del email en texto plano.
 * @returns {Promise<void>} Una promesa que se resuelve cuando el email ha sido enviado.
 */

const sendEmail = async ({ email, subject, text }: EmailOptions): Promise<void> => {
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

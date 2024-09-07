import nodemailer, { Transporter } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import exphbs from 'express-handlebars';
import path from 'path';

interface MailConfig {
  host: string;
  user: string;
  port: number;
  password: string;
}

const mailConfig: MailConfig = {
  host: process.env.EMAIL_HOST as string,
  user: process.env.EMAIL_HOST_USER as string,
  port: parseInt(process.env.MY_PORT || '587', 10),
  password: process.env.EMAIL_HOST_PASSWORD as string,
};

export const mailTransporter = async (): Promise<Transporter> => {
  const transporter = nodemailer.createTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    secure: false,
    auth: {
      user: mailConfig.user,
      pass: mailConfig.password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const hbsConfig = {
    viewEngine: {
      extName: '.hbs',
      partialsDir: path.join(__dirname, '../modules/email/templates'),
      layoutsDir: path.join(__dirname, '../modules/email/templates'),
      defaultLayout: '',
    },
    viewPath: path.join(__dirname, '../modules/email/templates'),
    extName: '.hbs',
  };

  transporter.use('compile', hbs(hbsConfig));

  return transporter;
};

export default mailConfig;

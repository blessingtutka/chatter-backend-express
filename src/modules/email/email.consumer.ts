import { mailTransporter } from '../../config/mailer.config';
import { emailQueue } from './queue.service';
import nodemailer from 'nodemailer';
import { Job } from 'bull';

export const processEmailQueue = async (job: Job) => {
  const transporter = await mailTransporter();

  const {
    from,
    to,
    subject,
    template,
    context: { firstName, resetLink },
  } = job.data;

  console.log('Sending mail to %s', to);
  const mailOptions = {
    from,
    to,
    subject,
    template,
    context: {
      firstName,
      resetLink,
    },
  };

  const mail = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', mail.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mail));

  return nodemailer.getTestMessageUrl(mail);
};

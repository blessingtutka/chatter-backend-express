import { getFile } from '../../helpers/file-manager';
import HttpResponse from '../../helpers/http-response';
import { mailTransporter } from '../../config/mailer.config';
import nodemailer from 'nodemailer';

export const getTemplate = async (templateInfo: { templateName: string }) => {
  try {
    const template = await getFile(
      `./src/modules/email/templates/${templateInfo.templateName}.hbs`,
      'utf-8',
    );

    const response = HttpResponse.success(
      { template: template },
      'Template retrieved successfully',
    );

    return response;
  } catch (error) {
    return HttpResponse.notFound();
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetLink: string,
  firstName: string,
): Promise<void> => {
  try {
    const transporter = await mailTransporter();

    const mailOptions = {
      from: '"Blessing Tutka" <no-reply@guideon.com>',
      to: email,
      subject: 'Password Reset Request',
      template: 'reset-password',
      context: {
        firstName,
        resetLink,
      },
    };

    const mail = await transporter.sendMail(mailOptions);

    console.log(`Password reset email sent to ${email}`);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mail));
  } catch (error: any) {
    throw new Error(error);
  }
};

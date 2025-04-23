import { getFile } from '../../helpers/file-manager';
import HttpResponse from '../../helpers/http-response';
import { addMinutes, differenceInMinutes } from 'date-fns';
import { sendMail } from './queue.service';

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
): Promise<void> => {
  try {
    const mailOptions: ResetEmailType = {
      from: '"Blessing Tutka" <no-reply@guideon.com>',
      to: email,
      subject: 'Password Reset Request',
      template: 'reset-password',
      context: {
        resetLink,
      },
    };

    await sendMail(mailOptions);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const sendOtpEmail = async (
  email: string,
  otpCode: string,
  firstName: string,
  expiresAt: Date,
): Promise<void> => {
  const expiresIn = differenceInMinutes(expiresAt, new Date());
  try {
    const mailOptions: OtpEmailType = {
      from: '"Blessing Tutka" <no-reply@guideon.com>',
      to: email,
      subject: 'One Time Password',
      template: 'send-otp',
      context: {
        firstName,
        otpCode,
        expiresIn,
      },
    };

    await sendMail(mailOptions);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const sendClientMail = async (
  email: string,
  message: string,
  name: string,
  services: string[],
): Promise<void> => {
  try {
    const mailOptions: EmailType = {
      from: email,
      to: '"Blessing Tutka" <no-reply@guideon.com>',
      subject: 'New Client Message',
      template: 'client-message',
      context: {
        name,
        email,
        message,
        services,
      },
    };

    await sendMail(mailOptions);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const sendVerifyEmail = async (
  email: string,
  verificationLink: string,
  firstName: string,
): Promise<void> => {
  try {
    const mailOptions: EmailType = {
      from: '"Blessing Tutka" <no-reply@guideon.com>',
      to: email,
      subject: 'Email Verification',
      template: 'email-verification',
      context: {
        firstName,
        verificationLink,
      },
    };

    await sendMail(mailOptions);
  } catch (error: any) {
    throw new Error(error);
  }
};

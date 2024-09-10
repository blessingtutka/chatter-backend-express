import { getFile } from '../../helpers/file-manager';
import HttpResponse from '../../helpers/http-response';
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
  firstName: string,
): Promise<void> => {
  try {
    const mailOptions: EmailType = {
      from: '"Blessing Tutka" <no-reply@guideon.com>',
      to: email,
      subject: 'Password Reset Request',
      template: 'reset-password',
      context: {
        firstName,
        resetLink,
      },
    };

    await sendMail(mailOptions);
  } catch (error: any) {
    throw new Error(error);
  }
};

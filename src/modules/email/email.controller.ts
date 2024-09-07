import { Request, Response } from 'express';
import HttpResponse from '../../helpers/http-response';
import * as mailService from '../email/email.service';
import { validateReset } from '../../validator/auth.validators';

export const handlePasswordResetRequest = async (
  req: Request,
  res: Response,
) => {
  const { email } = req.body;
  const resetLink = 'https://chatter.com/reset-password?token=chatterToken';
  const firstName = 'Sinan';

  const errors = await validateReset(req.body);
  if (errors.length > 0) return res.status(422).json({ errors });

  try {
    await mailService.sendPasswordResetEmail(email, resetLink, firstName);
    const response = HttpResponse.success(
      null,
      'Password reset email sent successfully',
    );
    return response.send(res);
  } catch (error) {
    const error_response = HttpResponse.serverError(
      'Failed to send password reset email',
    );
    return error_response.send(res);
  }
};

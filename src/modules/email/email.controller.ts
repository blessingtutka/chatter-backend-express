import { Request, Response } from 'express';
import HttpResponse from '../../helpers/http-response';
import * as mailService from '../email/email.service';
import { validateReset } from '../../validator/auth.validators';
import { validateClient } from '../../validator/client.validators';
import { generateResetVerificationToken } from '../../utils';

export const handlePasswordResetRequest = async (
  req: Request,
  res: Response,
) => {
  const { email } = req.body;
  const token = generateResetVerificationToken(email);
  const resetLink = `https://chatter.com/reset-password?token=${token}`;

  const errors = await validateReset(req.body);
  if (errors.length > 0) return res.status(422).json({ errors });

  try {
    await mailService.sendPasswordResetEmail(email, resetLink);
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

export const handleClientMail = async (req: Request, res: Response) => {
  const { email, name, message, services } = req.body;
  const errors = await validateClient(req.body);
  if (errors.length > 0) return res.status(422).json({ errors });

  try {
    await mailService.sendClientMail(email, message, name || '', services);
    const response = HttpResponse.success(
      null,
      'Client email sent successfully',
    );
    return response.send(res);
  } catch (error) {
    const error_response = HttpResponse.serverError(
      'Failed to send client email',
    );
    return error_response.send(res);
  }
};

export const handleVerifyEmailRequest = async (req: Request, res: Response) => {
  const { email, firstName } = req.body;
  const token = generateResetVerificationToken(email);
  const verificationLink = `https://chatter.com/verify-email?token=${token}`;

  const errors = await validateReset(req.body);
  if (errors.length > 0) return res.status(422).json({ errors });

  try {
    await mailService.sendVerifyEmail(email, verificationLink, firstName || '');
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

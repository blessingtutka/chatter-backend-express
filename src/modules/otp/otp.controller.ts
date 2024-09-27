import { Request, Response } from 'express';
import HttpResponse from '../../helpers/http-response';
import * as mailService from '../email/email.service';
import * as otpService from './otp.service';
import * as userService from '../user/user.service';
import {
  validateOtpRequest,
  validateOtpVerification,
} from '../../validator/auth.validators';
import { addMinutes } from 'date-fns';
import { generateOTP } from '../../utils/generate-otp';

export const handleOtpRequest = async (req: Request, res: Response) => {
  const { email } = req.body;
  const expiresAt = addMinutes(new Date(), 10);

  const errors = await validateOtpRequest(req.body);
  if (errors.length > 0) return res.status(422).json({ errors });

  try {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      const response = HttpResponse.notFound('Unknown User');
      return response.send(res);
    }

    const otp = await otpService.createOpt({
      userId: user?.userId,
      code: generateOTP(),
      expiresAt: expiresAt,
    });

    await mailService.sendOtpEmail(
      otp.user.email,
      otp.code,
      otp.user.username || '',
      otp.expiresAt,
    );
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

export const handleOtpVerification = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  const errors = await validateOtpVerification(req.body);
  if (errors.length > 0) return res.status(422).json({ errors });

  try {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      const response = HttpResponse.notFound('Unknown User');
      return response.send(res);
    }

    const isOtpValid = await otpService.verifyOpt(user.userId, code);

    if (!isOtpValid) {
      const response = HttpResponse.unAuthorized('Invalid OTP');
      return response.send(res);
    }
    const response = HttpResponse.success(null, 'OTP verified successfully');
    return response.send(res);
  } catch (error) {
    const error_response = HttpResponse.serverError('Failed to verify OTP');
    return error_response.send(res);
  }
};

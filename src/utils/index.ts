import isExpiredToken from './isexpired-token';
import extractTokenFromHeader from './extract-token';
import { generateOTP } from './generate-otp';
import {
  generateToken,
  generateResetVerificationToken,
} from './generate-token';
import { otpExpiresAt } from './otp-expire';
import { sanitizeInput } from './sanitize-input';

export {
  isExpiredToken,
  extractTokenFromHeader,
  generateOTP,
  generateToken,
  generateResetVerificationToken,
  sanitizeInput,
  otpExpiresAt,
};

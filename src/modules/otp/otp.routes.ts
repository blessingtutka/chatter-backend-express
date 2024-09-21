import { Router } from 'express';
import { handleOtpRequest, handleOtpVerification } from './otp.controller';

const otpRoutes = Router();

otpRoutes.post('/request', handleOtpRequest);
otpRoutes.post('/verification', handleOtpVerification);

export default otpRoutes;

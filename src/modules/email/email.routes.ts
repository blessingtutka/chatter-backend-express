import { Router } from 'express';
import {
  handlePasswordResetRequest,
  handleVerifyEmailRequest,
} from './email.controller';

const emailRoutes = Router();

emailRoutes.post('/password-reset', handlePasswordResetRequest);
emailRoutes.post('/verify-email', handleVerifyEmailRequest);

export default emailRoutes;

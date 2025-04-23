import { Router } from 'express';
import {
  handlePasswordResetRequest,
  handleVerifyEmailRequest,
  handleClientMail,
} from './email.controller';

const emailRoutes = Router();

emailRoutes.post('/send/email', handleClientMail);
emailRoutes.post('/password-reset', handlePasswordResetRequest);
emailRoutes.post('/verify-email', handleVerifyEmailRequest);

export default emailRoutes;

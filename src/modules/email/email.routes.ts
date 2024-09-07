import { Router } from 'express';
import { handlePasswordResetRequest } from './email.controller';

const emailRoutes = Router();

emailRoutes.post('/password-reset', handlePasswordResetRequest);

export default emailRoutes;

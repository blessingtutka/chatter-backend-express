import { Router } from 'express';
import { register, login, profile } from './auth.controller';
import { googleAuthCallback } from './oauth.controller';
import authenticate, {
  authenticateGoogle,
  authenticateGoogleCallback,
} from '../../middlewares/authenticate';

const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/google', authenticateGoogle);
authRoutes.get(
  '/google/callback',
  authenticateGoogleCallback,
  googleAuthCallback,
);
authRoutes.get('/profile', authenticate, profile);

export default authRoutes;

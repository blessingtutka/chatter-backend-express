import { Router } from 'express';
import { register, login, profile } from './auth.controller';
import { googleAuthCallback, facebookAuthCallback } from './oauth.controller';
import authenticate, {
  authenticateGoogle,
  authenticateFacebook,
  authenticateGoogleCallback,
  authenticateFacebookCallback,
} from '../../middlewares/authenticate';

const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/google', authenticateGoogle);
authRoutes.get('/facebook', authenticateFacebook);
authRoutes.get(
  '/google/callback',
  authenticateGoogleCallback,
  googleAuthCallback,
);
authRoutes.get(
  '/facebook/callback',
  authenticateFacebookCallback,
  facebookAuthCallback,
);
authRoutes.get('/profile', authenticate, profile);

export default authRoutes;

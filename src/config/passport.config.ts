import passport from 'passport';
import { Response, Request } from 'express';
import googleStartegy from '../modules/auth/strategies/google.strategy';
import jwtStrategy from '../modules/auth/strategies/jwt.strategy';

export interface User {
  id: string;
  displayName: string;
  emails: { value: string }[];
}

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user as User);
});

// Google OAuth2 strategy configuration
passport.use(googleStartegy);

// JWT strategy configuration
passport.use(jwtStrategy);

export default passport;

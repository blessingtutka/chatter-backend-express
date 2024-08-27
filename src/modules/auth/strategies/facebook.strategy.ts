import { Strategy as FacebookStrategy } from 'passport-facebook';
import { createAccount, getUserByEmail } from '../auth.service';
import { Request, Response, NextFunction } from 'express';
import { generateToken } from '../../../utils/generate-token';
import config from '../../../config/server.config';

const facebookStartegy = new FacebookStrategy(
  {
    clientID: config.facebookClientId,
    clientSecret: config.facebookClientSecret,
    callbackURL: `/auth/facebook/callback`,
    profileFields: ['id', 'emails', 'name'],
    passReqToCallback: true,
  },
  async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) => {
    const { id, name, emails } = profile;

    if (!emails || emails.length === 0) {
      return done(new Error('No email found in user profile'), false);
    }

    const userInfo = {
      username: name?.givenName || '',
      email: emails[0].value,
      password: '',
    };

    try {
      let user = await getUserByEmail(userInfo.email);

      if (!user) {
        user = await createAccount(userInfo);
      }
      const token = generateToken(user);
      done(null, { access_token: token, user: user });
    } catch (error) {
      done(error, null);
    }
  },
);

export default facebookStartegy;

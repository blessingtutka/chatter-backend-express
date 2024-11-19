import { creategoogleAccount, getUserByGoogleId } from '../oauth.service';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { generateToken } from '../../../utils';
import authConfig from '../../../config/auth.config';

const googleStartegy = new GoogleStrategy(
  {
    clientID: authConfig.google.clientId,
    clientSecret: authConfig.google.clientSecret,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    const { id, name, emails, photos } = profile;

    if (!emails || emails.length === 0) {
      return done(new Error('No email found in user profile'), false);
    }

    const userInfo = {
      username: name?.givenName || '',
      email: emails[0].value,
      googleId: id,
      avatarUrl: photos ? photos[0].value : '',
    };

    try {
      let user = await getUserByGoogleId(userInfo.googleId);

      if (!user) {
        user = await creategoogleAccount(userInfo);
      }
      const token = generateToken(user);
      return done(null, { access_token: token, user: user });
    } catch (error) {
      return done(error, false);
    }
  },
);

export default googleStartegy;

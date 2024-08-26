import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import config from '../../../config/server.config';

import { getUser } from '../auth.service';

interface JwtPayload {
  userId: string;
  email?: string;
}

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const jwtStrategy = new JwtStrategy(
  opts,
  async (
    jwt_payload: JwtPayload,
    done: (error: any, user?: any, info?: any) => void,
  ) => {
    try {
      const user = await getUser(jwt_payload.userId);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  },
);

export default jwtStrategy;

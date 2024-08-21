import jwt from 'jsonwebtoken';
import config from '../config/server.config';
import { User } from '../config/db.config';

export const generateToken = (user: User): string => {
  return jwt.sign(
    { userId: user.userId, email: user.email },
    config.jwtSecret,
    {
      expiresIn: '2d',
    },
  );
};

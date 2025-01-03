import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import passport from '../config/passport.config';
import authConfig from '../config/auth.config';
import HttpResponse from '../helpers/http-response';
import { extractTokenFromHeader, isExpiredToken } from '../utils';

interface AuthenticatedRequest extends Request {
  user?: string | jwt.JwtPayload;
}

const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = extractTokenFromHeader(req);

  if (!token) {
    const response = HttpResponse.unAuthorized('No token provided');
    return response.send(res);
  }

  try {
    const payload = jwt.verify(token, authConfig.jwt.secret);
    if (isExpiredToken(payload)) {
      const response = HttpResponse.unAuthorized('token expires');
      return response.send(res);
    }
    req.user = payload;
    next();
  } catch (error) {
    const response = HttpResponse.unAuthorized('Invalid token');
    return response.send(res);
  }
};

const authenticateGoogle = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate('google', { scope: ['profile', 'email'] })(
    req,
    res,
    next,
  );
};

const authenticateFacebook = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
};

const authenticateGoogleCallback = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    'google',
    { failureRedirect: '/', scope: ['email', 'profile'] },
    (err: any, user: any, info: any) => {
      if (err) {
        const response = HttpResponse.unAuthorized('Authentication error');
        return response.send(res);
      }
      if (!user) {
        const response = HttpResponse.unAuthorized('Unauthorized user');
        return response.send(res);
      }
      req.user = user;
      next();
    },
  )(req, res, next);
};

const authenticateFacebookCallback = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    'facebook',
    { failureRedirect: '/', scope: ['email', 'profile'] },
    (err: any, user: any, info: any) => {
      if (err) {
        const response = HttpResponse.unAuthorized('Authentication error');
        return response.send(res);
      }
      if (!user) {
        const response = HttpResponse.unAuthorized('Unauthorized user');
        return response.send(res);
      }
      req.user = user;
      next();
    },
  )(req, res, next);
};

export default authenticate;

export {
  authenticateGoogle,
  authenticateFacebook,
  authenticateGoogleCallback,
  authenticateFacebookCallback,
};

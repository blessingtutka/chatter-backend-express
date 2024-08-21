import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/server.config';
import HttpResponse from '../helpers/http-response';

interface AuthenticatedRequest extends Request {
  user?: string | jwt.JwtPayload;
}

const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const response = HttpResponse.unAuthorized('No token provided');
    return response.send(res);
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    const response = HttpResponse.unAuthorized('No token provided');
    return response.send(res);
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    const response = HttpResponse.unAuthorized('No token provided');
    return response.send(res);
  }
};

export default authenticate;

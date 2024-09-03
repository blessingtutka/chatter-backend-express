import { Request, Response } from 'express';
import * as authService from './auth.service';
import {
  validateRegistration,
  validateLogin,
} from '../../validator/auth.validators';
import { generateToken } from '../../utils/generate-token';
import HttpResponse from '../../helpers/http-response';

const register = async (req: Request, res: Response) => {
  const data = req.body;
  const errors = await validateRegistration(req.body);
  if (errors.length > 0) return res.status(422).json({ errors });

  try {
    const user = await authService.createAccount(data);
    const token = generateToken(user);
    const response = HttpResponse.success(
      { access_token: token, user: user },
      'Accound created successfully',
    );
    return response.send(res);
  } catch (error) {
    const response = HttpResponse.badRequest();
    return response.send(res);
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const errors = validateLogin(req.body);
  if (errors.length > 0) return res.status(422).json({ errors });

  try {
    const user = await authService.validateUserAndPassword(email, password);

    if (user) {
      const token = generateToken(user);
      const response = HttpResponse.success(
        {
          access_token: token,
          user: user,
        },
        'Login successful',
      );
      return response.send(res);
    } else {
      const response = HttpResponse.badRequest('Bad Credential');
      return response.send(res);
    }
  } catch (error) {
    const response = HttpResponse.badRequest('Authentication failed');
    return response.send(res);
  }
};

const profile = async (req: Request, res: Response) => {
  const response = HttpResponse.success('Welcome to profile page');
  return response.send(res);
};
export { register, login, profile };

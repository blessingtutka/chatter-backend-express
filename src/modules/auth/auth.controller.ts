import { Request, Response } from 'express';
import * as authService from './auth.service';
import { validateRegistration } from '../../validator/auth.validators';
import HttpResponse from '../../helpers/http-response';

const register = async (res: Response, req: Request) => {
  try {
    const data = req.body;

    const errors = await validateRegistration(req.body);
    if (errors.length > 0) return res.status(422).json({ errors });

    const user = await authService.createAccount(data);
    const response = HttpResponse.success(
      { ...user },
      'Accound created successfully',
    );

    return response.send(res);
  } catch (error) {
    const response = HttpResponse.badRequest();
    return response.send(res);
  }
};

export { register };

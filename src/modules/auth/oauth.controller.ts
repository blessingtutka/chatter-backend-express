import { Response, Request } from 'express';
import HttpResponse from '../../helpers/http-response';

export const googleAuthCallback = (req: Request, res: Response) => {
  const response = HttpResponse.success(
    { user: req.user },
    'Google authentication successful',
  );
  return response.send(res);
};

export const facebookAuthCallback = (req: Request, res: Response) => {
  const response = HttpResponse.success(
    { user: req.user },
    'Facebook authentication successful',
  );
  return response.send(res);
};

import { Response } from 'express';

class HttpResponse {
  status_code: number;
  data: any;
  message: string;
  status: 'success' | 'error';
  error_code: string;

  constructor(
    status_code: number,
    status: 'success' | 'error',
    message: string = '',
    data: any = null,
    error_code: string = '',
  ) {
    this.status_code = status_code;
    this.status = status;
    this.message = message;
    this.data = data;
    this.error_code = error_code;
  }

  static success(
    data: any = null,
    message: string = 'The request was successful processed',
    status_code: number = 200,
  ): HttpResponse {
    return new HttpResponse(status_code, 'success', message, data);
  }

  static created(
    data: any = null,
    message: string = 'The resource was successful created',
    status_code: number = 201,
  ): HttpResponse {
    return new HttpResponse(status_code, 'success', message, data);
  }

  static deleted(
    message: string = 'The resource was successful deleted',
    status_code: number = 204,
  ): HttpResponse {
    return new HttpResponse(status_code, 'success', message);
  }

  static serverError(
    message: string = 'An internal server error occurred. Please try again later.',
    status_code: number = 500,
  ): HttpResponse {
    return new HttpResponse(
      status_code,
      'error',
      message,
      null,
      'Server Error',
    );
  }

  static badRequest(
    message: string = 'The request could not be processed due to a client error',
    status_code: number = 400,
  ): HttpResponse {
    return new HttpResponse(status_code, 'error', message, null, 'Bad Request');
  }

  static notFound(
    message: string = 'The requested resource could not be found.',
    status_code: number = 404,
  ): HttpResponse {
    return new HttpResponse(status_code, 'error', message, null, 'Not Found');
  }

  static unAuthorized(
    message: string = 'Unauthorized access. Please provide valid credentials.',
    status_code: number = 401,
  ): HttpResponse {
    return new HttpResponse(
      status_code,
      'error',
      message,
      null,
      'Unauthorized',
    );
  }

  static forbidden(
    message: string = 'Access denied. You do not have the necessary permissions.',
    status_code: number = 403,
  ): HttpResponse {
    return new HttpResponse(status_code, 'error', message, null, 'Forbidden');
  }

  toJson() {
    const response: any = {
      status_code: this.status_code,
      status: this.status,
    };

    if (this.status === 'error') {
      response.error = {
        code: this.error_code,
        message: this.message,
      };
    } else if (this.status === 'success') {
      response.message = this.message;
      if (this.data) {
        response.data = this.data;
      }
    }
    return response;
  }

  send(res: Response) {
    res.status(this.status_code).json(this.toJson());
  }
}

export default HttpResponse;

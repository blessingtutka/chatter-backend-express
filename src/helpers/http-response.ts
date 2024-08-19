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
    message: string = 'Request was successful',
    status_code: number = 200,
  ): HttpResponse {
    return new HttpResponse(status_code, 'success', message, data);
  }

  static serverError(
    message: string = 'An error occurred',
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
    message: string = 'Bad request',
    status_code: number = 400,
  ): HttpResponse {
    return new HttpResponse(status_code, 'error', message, null, 'Bad Request');
  }

  static notFound(
    message: string = 'Resource not found',
    status_code: number = 404,
  ): HttpResponse {
    return new HttpResponse(status_code, 'error', message, null, 'Not Found');
  }

  toJson() {
    if (this.status === 'error') {
      return {
        status_code: this.status_code,
        status: this.status,
        error: {
          code: this.error_code,
          message: this.message,
        },
      };
    }
    return {
      status_code: this.status_code,
      status: this.status,
      message: this.message,
      data: this.data,
    };
  }

  send(res: Response) {
    res.status(this.status_code).json(this.toJson());
  }
}

export default HttpResponse;

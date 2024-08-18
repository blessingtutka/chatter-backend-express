import { Response } from 'express';

class HttpResponse {
  status_code: number;
  data: any;
  message: string;
  status: 'success' | 'error';

  constructor(
    status_code: number,
    status: 'success' | 'error',
    message: string = '',
    data: any = null,
  ) {
    this.status_code = status_code;
    this.status = status;
    this.message = message;
    this.data = data;
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
    data: any = null,
  ): HttpResponse {
    return new HttpResponse(status_code, 'error', message, data);
  }

  static badRequest(
    message: string = 'Bad request',
    status_code: number = 400,
    data: any = null,
  ): HttpResponse {
    return new HttpResponse(status_code, 'error', message, data);
  }

  static notFound(
    message: string = 'Resource not found',
    status_code: number = 404,
    data: any = null,
  ): HttpResponse {
    return new HttpResponse(status_code, 'error', message, data);
  }

  toJson() {
    return {
      status_code: this.status_code,
      status: this.status,
      message: this.message,
      data: this.data,
    };
  }
  send(res: any) {
    res.status(this.status_code).json(this.toJson());
  }
}

export default HttpResponse;

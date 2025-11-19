import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { AppError } from 'src/common/exceptions/app-error.exception';
import { FailedResponse } from 'src/common/types';

export class GlobalExceptionFilter implements ExceptionFilter {
  public catch(exception: any, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    res.status(res.statusCode);

    let statusCode: number = 500;
    let message: string = 'Internal Server Errror';
    let errorCode: string = 'INTERNAL_SERVER_ERROR';

    if (exception instanceof AppError) {
      statusCode = exception.statusCode;
      message = exception.message;
      errorCode = exception.errorCode;
    }

    res.json({
      success: false,
      statusCode: statusCode,
      message: message,
      errorCode: errorCode,
    } as FailedResponse);
  }
}

import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { AppError } from 'src/common/exceptions/app-error.exception';
import { ValidationFailedError } from 'src/common/exceptions/validation-failed.exception';
import { FailedResponse } from 'src/common/types';
import { ValidationError } from 'src/common/types/validation-error.type';

export class GlobalExceptionFilter implements ExceptionFilter {
  public catch(exception: any, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    res.status(res.statusCode);

    let statusCode: number = 500;
    let message: string = 'Internal Server Errror';
    let errorCode: string = 'INTERNAL_SERVER_ERROR';
    let validationErrors: ValidationError[] = [];

    if (exception instanceof ValidationFailedError) {
      statusCode = exception.statusCode;
      message = exception.message;
      errorCode = exception.errorCode;
      validationErrors = exception.validationErrors;
    }

    if (exception instanceof AppError) {
      statusCode = exception.statusCode;
      message = exception.message;
      errorCode = exception.errorCode;
    }

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.message;
      errorCode = 'FAILED';
    }

    res.json({
      success: false,
      statusCode: statusCode,
      message: message,
      errorCode: errorCode,
      validationErrors:
        validationErrors.length !== 0 ? validationErrors : undefined,
    } as FailedResponse);
  }
}

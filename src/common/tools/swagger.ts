import { AppError } from '../exceptions/app-error.exception';
import { FailedResponse, SuccessResponse } from '../types';

export function buildSuccessResponse(
  response: SuccessResponse,
): SuccessResponse {
  return {
    success: true,
    statusCode: response.statusCode ?? 200,
    message: response.message ?? 'success',
    data: response.data,
  };
}

export function buildFailedResponse(appError: AppError): FailedResponse {
  return {
    success: false,
    statusCode: appError.statusCode,
    message: appError.message,
    errorCode: appError.errorCode,
  };
}

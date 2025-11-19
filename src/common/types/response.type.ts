import { ValidationError } from './validation-error.type';

export interface SuccessResponse {
  success?: true;
  statusCode?: number;
  message?: string;
  data?: any;
}

export interface FailedResponse {
  success: false;
  statusCode: number;
  message: string;
  errorCode: string;
  validationErrors?: ValidationError[];
}

import { ValidationError } from './validation-error.type';

export interface FailedResponse {
  success: false;
  statusCode: number;
  message: string;
  errorCode: string;
  validationErrors?: ValidationError[];
}

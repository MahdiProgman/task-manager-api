import { ValidationError } from '../types/validation-error.type';

export class ValidationFailedError extends Error {
  public readonly statusCode: number = 400;
  public readonly message: string = 'Validation Failed';
  public readonly errorCode: string = 'VALIDATION_FAILED';

  public readonly validationErrors: ValidationError[] = [];

  constructor(validationErrors: ValidationError[]) {
    super('Validation Failed');

    validationErrors.forEach((validationError) => {
      this.validationErrors.push(validationError);
    });
  }
}

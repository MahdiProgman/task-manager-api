import { AppError } from 'src/common/exceptions/app-error.exception';

export class EmailIsAlreadyTakenError extends AppError {
  constructor() {
    super(409, 'email is already taken', 'EMAIL_IS_ALREADY_TAKEN');
  }
}

import { AppError } from 'src/common/exceptions/app-error.exception';

export class EmailOrPasswordIsIncorrect extends AppError {
  constructor() {
    super(
      401,
      'email or password is incorrect',
      'EMAIL_OR_PASSWORD_IS_INCORRECT',
    );
  }
}

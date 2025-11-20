import { AppError } from './app-error.exception';

export class UnauthorizedError extends AppError {
  constructor() {
    super(401, 'Unauthorized', 'UNAUTHORIZED');
  }
}

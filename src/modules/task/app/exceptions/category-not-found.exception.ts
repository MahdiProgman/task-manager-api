import { AppError } from 'src/common/exceptions/app-error.exception';

export class CategoryNotFoundError extends AppError {
  constructor() {
    super(404, 'category not found', 'CATEGORY_NOT_FOUND');
  }
}

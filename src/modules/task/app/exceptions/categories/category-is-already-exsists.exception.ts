import { AppError } from 'src/common/exceptions/app-error.exception';

export class CategoryIsAlreadyExsists extends AppError {
  constructor() {
    super(409, 'category is already exsists', 'CATEGORY_IS_ALREADY_EXSISTS');
  }
}

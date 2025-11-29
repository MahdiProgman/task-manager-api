import { AppError } from 'src/common/exceptions/app-error.exception';

export class SubTaskNotFoundError extends AppError {
  constructor() {
    super(404, 'sub task not found', 'SUB_TASK_NOT_FOUND');
  }
}

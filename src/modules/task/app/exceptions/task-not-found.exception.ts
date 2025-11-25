import { AppError } from 'src/common/exceptions/app-error.exception';

export class TaskNotFoundError extends AppError {
  constructor() {
    super(404, 'task not found', 'TASK_NOT_FOUND');
  }
}

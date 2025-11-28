import { TaskQueryDto } from './queries/task-query.dto';

export interface TaskQueryRepository {
  findUserTasks(userId: string): Promise<TaskQueryDto[]>;
}

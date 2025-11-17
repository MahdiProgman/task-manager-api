import { Task } from '../entities/task.entity';

export interface TaskRepository {
  createOne(task: Task): Promise<Task>;
  findUserTasks(userId: string): Promise<Task[] | null>;
}

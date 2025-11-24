import { Inject, Injectable } from '@nestjs/common';
import { TASK_QUERY_REPOSITORY } from '../../constants';
import { TaskQueryRepository } from '../repos/task-query.repository';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TASK_QUERY_REPOSITORY)
    private readonly taskQueryRepo: TaskQueryRepository,
  ) {}

  public async getAllTasks(userId: string) {
    const tasks = await this.taskQueryRepo.findUserTasks(userId);

    return tasks.length === 0 ? null : tasks;
  }
}

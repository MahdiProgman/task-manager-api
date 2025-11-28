import { Inject, Injectable } from '@nestjs/common';
import { CreateSubTaskDto } from '../dtos/subtasks/create-sub-task.dto';
import { TASK_REPOSITORY } from '../../constants';
import { TaskRepository } from '../../domain/repos/task.repository';
import { TaskNotFoundError } from '../exceptions/tasks/task-not-found.exception';
import { SubTask } from '../../domain/entities/sub-task.entity';

@Injectable()
export class SubTaskService {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepo: TaskRepository,
  ) {}

  public async addSubTask(
    ids: { userId: string; taskId: string },
    dto: CreateSubTaskDto,
  ) {
    const taskFound = await this.taskRepo.findById(ids.taskId);

    if (!taskFound) throw new TaskNotFoundError();
    if (taskFound.userId !== ids.userId) throw new TaskNotFoundError();

    const newSubTask = SubTask.create({
      title: dto.title,
      taskId: taskFound.id,
    });

    taskFound.addSubTask(newSubTask);

    await this.taskRepo.updateUserTaskById(taskFound.id, taskFound);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { CreateSubTaskDto } from '../dtos/subtasks/create-sub-task.dto';
import { TASK_REPOSITORY } from '../../constants';
import { TaskRepository } from '../../domain/repos/task.repository';
import { TaskNotFoundError } from '../exceptions/tasks/task-not-found.exception';
import { SubTask } from '../../domain/entities/sub-task.entity';
import { UpdateSubTaskDto } from '../dtos/subtasks/update-sub-task.dto';
import { SubTaskNotFoundError } from '../exceptions/subtasks/sub-task-not-found.exception';

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

  public async updateSubTask(
    ids: { userId: string; taskId: string; subTaskId: string },
    dto: UpdateSubTaskDto,
  ) {
    const taskFound = await this.taskRepo.findById(ids.taskId);

    if (!taskFound) throw new TaskNotFoundError();
    if (taskFound.userId !== ids.userId) throw new TaskNotFoundError();

    let subTaskUpdated = false;

    taskFound.subTasks.forEach((subTask) => {
      console.log(subTask);
      if (subTask.id == ids.subTaskId) {
        subTask.title = dto.title ?? subTask.title;
        subTask.changeStatus(dto.status ?? subTask.status);
        console.log(subTask);
        subTaskUpdated = true;
      }
    });

    if (!subTaskUpdated) throw new SubTaskNotFoundError();

    await this.taskRepo.updateUserTaskById(ids.taskId, taskFound);
  }
}

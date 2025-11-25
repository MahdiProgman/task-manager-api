import { Inject, Injectable } from '@nestjs/common';
import {
  CATEGORY_REPOSITORY,
  TASK_QUERY_REPOSITORY,
  TASK_REPOSITORY,
} from '../../constants';
import { TaskQueryRepository } from '../repos/task-query.repository';
import { TaskRepository } from '../../domain/repos/task.repository';
import { Task } from '../../domain/entities/task.entity';
import { CategoryRepository } from '../../domain/repos/category.repository';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { TaskQueryDto } from '../repos/queries/task-query.dto';
import { CategoryNotFoundError } from '../exceptions/category-not-found.exception';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { TaskNotFoundError } from '../exceptions/task-not-found.exception';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TASK_QUERY_REPOSITORY)
    private readonly taskQueryRepo: TaskQueryRepository,
    @Inject(TASK_REPOSITORY) private readonly taskRepo: TaskRepository,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepo: CategoryRepository,
  ) {}

  public async getAllTasks(userId: string) {
    const tasks = await this.taskQueryRepo.findUserTasks(userId);

    return tasks.length === 0 ? null : tasks;
  }

  public async createNewTask(
    userId: string,
    dto: CreateTaskDto,
  ): Promise<TaskQueryDto> {
    const categoryFound = await this.categoryRepo.findById(dto.categoryId);

    if (!categoryFound) throw new CategoryNotFoundError();
    if (categoryFound.userId !== userId) throw new CategoryNotFoundError();

    const newTask = await this.taskRepo.createOne(
      Task.create({
        title: dto.title,
        description: dto.description,
        priority: dto.priority,
        dueDate: dto.dueDate,
        categoryId: dto.categoryId,
        userId: userId,
      }),
    );

    return {
      id: newTask.id,
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      categoryName: categoryFound.name,
      createdAt: newTask.createdAt,
      subTasks: [],
    };
  }

  public async removeTask(userId: string, taskId: string) {
    await this.taskRepo.deleteUserTaskById(userId, taskId);
  }

  public async updateTask(
    ids: {
      id: string;
      userId: string;
    },
    dto: UpdateTaskDto,
  ): Promise<TaskQueryDto> {
    const taskFound = await this.taskRepo.findById(ids.id);

    if (!taskFound) throw new TaskNotFoundError();
    if (taskFound.userId !== ids.userId) throw new TaskNotFoundError();

    const categoryFound = await this.categoryRepo.findById(
      dto.categoryId ?? taskFound.categoryId,
    );

    if (!categoryFound) throw new CategoryNotFoundError();
    if (categoryFound.userId !== ids.userId) throw new CategoryNotFoundError();

    taskFound.changeCategory(categoryFound.id);

    taskFound.title = dto.title ?? taskFound.title;
    taskFound.description = dto.description ?? taskFound.description;

    taskFound.changePriority(dto.priority ?? taskFound.priority);
    taskFound.changeStatus(dto.status ?? taskFound.status);

    const result = await this.taskRepo.updateUserTaskById(
      taskFound.id,
      taskFound,
    );

    return {
      id: result.id,
      title: result.title,
      description: result.description,
      status: result.status,
      priority: result.priority,
      dueDate: result.dueDate,
      categoryName: categoryFound.name,
      createdAt: result.createdAt,
      subTasks: taskFound.subTasks.map((subTask) => ({
        id: subTask.id,
        title: subTask.title,
        status: subTask.status,
        createdAt: subTask.createdAt,
      })),
    };
  }
}

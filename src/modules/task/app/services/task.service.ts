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
}

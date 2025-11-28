import { DatabaseService } from 'src/database/database.service';
import { TaskRepository as ITaskRepository } from '../../domain/repos/task.repository';
import { Task } from '../../domain/entities/task.entity';
import { TaskMapper } from '../mappers/task.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async createOne(task: Task): Promise<Task> {
    const result = await this.databaseService.task.create({
      data: TaskMapper.toPersistence(task),
    });

    return TaskMapper.toDomain(result);
  }

  public async findUserTasks(userId: string): Promise<Task[] | null> {
    const tasks = await this.databaseService.task.findMany({
      where: {
        userId: userId,
      },
    });

    return tasks.length !== 0
      ? tasks.map((task) => TaskMapper.toDomain(task))
      : null;
  }

  public async deleteUserTaskById(
    userId: string,
    taskId: string,
  ): Promise<void> {
    await this.databaseService.task.delete({
      where: {
        id: taskId,
        userId: userId,
      },
    });
  }

  public async updateUserTaskById(id: string, task: Task): Promise<Task> {
    const updatedTask = await this.databaseService.task.update({
      where: {
        id: id,
      },
      data: {
        ...TaskMapper.toPersistence(task),
        subTasks: {
          upsert: task.subTasks.map((subTask) => ({
            where: { id: subTask.id ?? '' },
            create: {
              title: subTask.title,
              status: subTask.status,
            },
            update: {
              title: subTask.title,
              status: subTask.status,
            },
          })),
        },
      },
      include: {
        subTasks: true,
      },
    });

    return TaskMapper.toDomain(updatedTask);
  }

  public async findById(id: string): Promise<Task | null> {
    const taskFound = await this.databaseService.task.findUnique({
      where: {
        id: id,
      },
    });

    return taskFound ? TaskMapper.toDomain(taskFound) : null;
  }
}

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
}

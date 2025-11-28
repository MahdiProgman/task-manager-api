import { Injectable } from '@nestjs/common';
import { TaskQueryRepository as ITaskQueryRepository } from '../../app/repos/task-query.repository';
import { TaskQueryDto } from '../../app/repos/queries/task-query.dto';
import { DatabaseService } from 'src/database/database.service';
import { SubTaskQueryDto } from '../../app/repos/queries/sub-task-query.dto';
import { TaskPriority, TaskStatus } from '../../domain/entities/enums';

@Injectable()
export class TaskQueryRepository implements ITaskQueryRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findUserTasks(userId: string): Promise<TaskQueryDto[]> {
    const userTasks = await this.databaseService.task.findMany({
      where: {
        userId: userId,
      },
      include: {
        subTasks: {
          orderBy: {
            status: 'asc',
          },
        },
        category: true,
      },
      orderBy: [
        {
          priority: 'desc',
        },
        {
          status: 'asc',
        },
      ],
    });

    return userTasks.map((userTask) => ({
      id: userTask.id,
      title: userTask.title,
      description: userTask.description,
      priority: userTask.priority as TaskPriority,
      status: userTask.status as TaskStatus,
      dueDate: userTask.dueDate,
      categoryName: userTask.category.name,
      createdAt: userTask.createdAt,
      subTasks: userTask.subTasks.map(
        (subTask): SubTaskQueryDto => ({
          id: subTask.id,
          title: subTask.title,
          status: subTask.status as TaskStatus,
          createdAt: subTask.createdAt,
        }),
      ),
    }));
  }
}

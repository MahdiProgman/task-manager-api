import {
  Prisma,
  Task as PrismaTask,
  TaskPriority as PrismaTaskPriority,
  TaskStatus as PrismaTaskStatus,
  SubTask as SubTaskPersistenceEntity,
} from '@prisma/client';
import { Task as TaskDomainEntity } from '../../domain/entities/task.entity';
import {
  TaskPriority as DomainTaskPriority,
  TaskStatus as DomainTaskStatus,
} from '../../domain/entities/enums';
import { SubTaskMapper } from './sub-task.mapper';

type TaskPersistenceEntityWithSubTasks = PrismaTask & {
  subTasks?: SubTaskPersistenceEntity[];
};

export class TaskMapper {
  static toDomain(data: TaskPersistenceEntityWithSubTasks): TaskDomainEntity {
    const subTasks = data.subTasks.map((subTask) =>
      SubTaskMapper.toDomain(subTask),
    );

    return TaskDomainEntity.create({
      id: data.id,
      title: data.title,
      description: data.description,
      status: data.status as DomainTaskStatus,
      priority: data.priority as DomainTaskPriority,
      dueDate: data.dueDate,
      createdAt: data.createdAt,
      userId: data.userId,
      categoryId: data.categoryId,
      subTasks: subTasks,
    });
  }

  static toPersistence(data: TaskDomainEntity): Prisma.TaskCreateInput {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      status: data.status as PrismaTaskStatus,
      priority: data.priority as PrismaTaskPriority,
      dueDate: data.dueDate,
      createdAt: data.createdAt,
      user: {
        connect: {
          id: data.userId,
        },
      },
      category: {
        connect: {
          id: data.categoryId,
        },
      },
    };
  }
}

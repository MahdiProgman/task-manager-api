import { Prisma, SubTask as SubTaskPersistenceEntity } from '@prisma/client';
import { SubTask as SubTaskDomainEntity } from '../../domain/entities/sub-task.entity';
import { TaskStatus } from '../../domain/entities/enums';

export class SubTaskMapper {
  static toDomain(data: SubTaskPersistenceEntity): SubTaskDomainEntity {
    return SubTaskDomainEntity.create({
      id: data.id,
      title: data.title,
      status: data.status as TaskStatus,
      taskId: data.taskId,
      createdAt: data.createdAt,
    });
  }

  static toPersistence(data: SubTaskDomainEntity): Prisma.SubTaskCreateInput {
    return {
      title: data.title,
      status: data.status,
      task: {
        connect: {
          id: data.taskId,
        },
      },
    };
  }
}

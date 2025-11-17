import {
  Task as TaskPersistenceEntity,
  SubTask as SubTaskPersistenceEntity,
} from '@prisma/client';
import { Task as TaskDomainEntity } from '../../domain/entities/task.entity';
import { TaskStatus, TaskPriority } from '../../domain/entities/enums';
import { TaskMapper } from './task.mapper';
import { SubTask } from '../../domain/entities/sub-task.entity';

type TaskPersistenceEntityWithSubTasks = TaskPersistenceEntity & {
  subTasks?: SubTaskPersistenceEntity[];
};

const taskPersistenceEntity: TaskPersistenceEntityWithSubTasks = {
  id: '123',
  title: 'persistence_task',
  description: 'just a description',
  status: 'COMPLETED',
  priority: 'HIGH',
  dueDate: new Date(),
  createdAt: new Date(),
  userId: '123',
  categoryId: '123',
  subTasks: [
    {
      id: '123',
      title: 'subtask',
      status: 'COMPLETED',
      createdAt: new Date(),
      taskId: '123',
    },
  ],
};

const taskDomainEntity: TaskDomainEntity = TaskDomainEntity.create({
  id: '123',
  title: 'domain_task',
  description: 'just a description',
  status: TaskStatus.Completed,
  priority: TaskPriority.High,
  dueDate: new Date(),
  userId: '123',
  categoryId: '123',
  createdAt: new Date(),
  subTasks: [
    new SubTask({
      title: 'subtask',
      taskId: '123',
    }),
  ],
});

describe('TaskMapper', () => {
  describe('toDomain', () => {
    it('should be convert persistence entity to domain entity', () => {
      const converted = TaskMapper.toDomain(taskPersistenceEntity);

      expect(converted.title).toBe(taskPersistenceEntity.title);
    });
  });
  describe('toPersistence', () => {
    it('should be convert domain entity to persistence entity', () => {
      const converted = TaskMapper.toPersistence(taskDomainEntity);

      expect(converted.title).toBe(taskDomainEntity.title);
    });
  });
});

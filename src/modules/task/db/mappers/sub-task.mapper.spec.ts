import { SubTask as SubTaskPersistenceEntity } from '@prisma/client';
import { SubTask as SubTaskDomainEntity } from '../../domain/entities/sub-task.entity';
import { TaskStatus } from '../../domain/entities/enums';
import { SubTaskMapper } from './sub-task.mapper';

const subTaskPersistenceEntity: SubTaskPersistenceEntity = {
  id: '123',
  title: 'persistence_subtask',
  status: 'COMPLETED',
  createdAt: new Date(),
  taskId: '123',
};

const subTaskDomainEntity: SubTaskDomainEntity = SubTaskDomainEntity.create({
  title: 'domain_subtask',
  status: TaskStatus.Completed,
  taskId: '123',
});

describe('SubTaskMapper', () => {
  describe('toDomain', () => {
    it('should be convert persistence entity to domain entity', () => {
      const converted = SubTaskMapper.toDomain(subTaskPersistenceEntity);

      expect(converted.title).toBe(subTaskPersistenceEntity.title);
    });
  });
  describe('toPersistence', () => {
    it('should be convert domain entity to persistence entity', () => {
      const converted = SubTaskMapper.toPersistence(subTaskDomainEntity);

      expect(converted.title).toBe(subTaskDomainEntity.title);
    });
  });
});

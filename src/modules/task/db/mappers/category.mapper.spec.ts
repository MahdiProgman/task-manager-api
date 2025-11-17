import { Category as CategoryPersistenceEntity } from '@prisma/client';
import { Category as CategoryDomainEntity } from '../../domain/entities/category.entity';
import { CategoryMapper } from './category.mapper';

const categoryPersistenceEntity: CategoryPersistenceEntity = {
  id: '123',
  name: 'persistance_category',
  userId: '123',
  createdAt: new Date(),
};

const categoryDomainEntity: CategoryDomainEntity = CategoryDomainEntity.create({
  name: 'domain_category',
  userId: '123',
});

describe('CategoryMapper', () => {
  describe('toDomain', () => {
    it('should be convert persistence entity to domain entity', () => {
      const converted = CategoryMapper.toDomain(categoryPersistenceEntity);

      expect(converted.name).toBe(categoryPersistenceEntity.name);
    });
  });
  describe('toPersistence', () => {
    it('should be convert domain entity to persistence entity', () => {
      const converted = CategoryMapper.toPersistence(categoryDomainEntity);

      expect(converted.name).toBe(categoryDomainEntity.name);
    });
  });
});

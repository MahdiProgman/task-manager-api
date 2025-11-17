import { Category as CategoryPersistenceEntity, Prisma } from '@prisma/client';
import { Category as CategoryDomainEntity } from '../../domain/entities/category.entity';

export class CategoryMapper {
  static toDomain(data: CategoryPersistenceEntity): CategoryDomainEntity {
    return CategoryDomainEntity.create({
      id: data.id,
      name: data.name,
      userId: data.userId,
      createdAt: data.createdAt,
    });
  }

  static toPersistence(data: CategoryDomainEntity): Prisma.CategoryCreateInput {
    return {
      id: data.id,
      name: data.name,
      createdAt: data.createdAt,
      user: {
        connect: {
          id: data.userId,
        },
      },
    };
  }
}

import { Injectable } from '@nestjs/common';
import { Category } from '../../domain/entities/category.entity';
import { CategoryRepository as ICategoryRepository } from '../../domain/repos/category.repository';
import { DatabaseService } from 'src/database/database.service';
import { CategoryMapper } from '../mappers/category.mapper';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async createOne(category: Category): Promise<Category> {
    const result = await this.databaseService.category.create({
      data: CategoryMapper.toPersistence(category),
    });

    return CategoryMapper.toDomain(result);
  }

  public async findUserCategories(userId: string): Promise<Category[] | null> {
    const categories = await this.databaseService.category.findMany({
      where: {
        userId: userId,
      },
    });

    return categories.length !== 0
      ? categories.map((category) => CategoryMapper.toDomain(category))
      : null;
  }

  public async findById(id: string): Promise<Category | null> {
    const categoryFound = await this.databaseService.category.findUnique({
      where: {
        id: id,
      },
    });

    return categoryFound ? CategoryMapper.toDomain(categoryFound) : null;
  }

  public async findByName(name: string): Promise<Category | null> {
    const categoryFound = await this.databaseService.category.findFirst({
      where: {
        name: name,
      },
    });

    return categoryFound ? CategoryMapper.toDomain(categoryFound) : null;
  }

  public async updateById(id: string, category: Category): Promise<Category> {
    const updatedCategory = await this.databaseService.category.update({
      where: {
        id: id,
      },
      data: CategoryMapper.toPersistence(category),
    });

    return CategoryMapper.toDomain(updatedCategory);
  }

  public async deleteById(id: string): Promise<void> {
    await this.databaseService.category.delete({
      where: {
        id: id,
      },
    });
  }
}

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
}

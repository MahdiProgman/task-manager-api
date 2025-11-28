import { Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from '../../constants';
import { CategoryRepository } from '../../domain/repos/category.repository';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepo: CategoryRepository,
  ) {}

  public async getAllCategories(userId: string) {
    const categories = await this.categoryRepo.findUserCategories(userId);

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
    }));
  }
}

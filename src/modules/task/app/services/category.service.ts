import { Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from '../../constants';
import { CategoryRepository } from '../../domain/repos/category.repository';
import { CreateCategoryDto } from '../dtos/categories/create-category.dto';
import { Category } from '../../domain/entities/category.entity';
import { CategoryIsAlreadyExsists } from '../exceptions/categories/category-is-already-exsists.exception';

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

  public async createNewCategory(userId: string, dto: CreateCategoryDto) {
    const categoryFound = await this.categoryRepo.findByName(dto.name);

    if (categoryFound) throw new CategoryIsAlreadyExsists();

    const newCategory = await this.categoryRepo.createOne(
      Category.create({
        name: dto.name,
        userId: userId,
      }),
    );

    return {
      id: newCategory.id,
      name: newCategory.name,
      createdAt: newCategory.createdAt,
    };
  }
}

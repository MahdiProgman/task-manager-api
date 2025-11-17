import { Category } from '../entities/category.entity';

export interface CategoryRepository {
  createOne(category: Category): Promise<Category>;
  findUserCategories(userId: string): Promise<Category[] | null>;
}

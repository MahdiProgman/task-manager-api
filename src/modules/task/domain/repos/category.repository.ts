import { Category } from '../entities/category.entity';

export interface CategoryRepository {
  createOne(category: Category): Promise<Category>;
  findUserCategories(userId: string): Promise<Category[] | null>;
  findById(id: string): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  updateById(id: string, category: Category): Promise<Category>;
}

import { CategoryQueryDto } from './queries/category-query.dto';

export interface CategoryQueryRepository {
  getCategory(id: string): Promise<CategoryQueryDto>;
}

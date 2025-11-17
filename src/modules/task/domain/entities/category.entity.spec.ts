import { Category } from './category.entity';

describe('CategoryEntity', () => {
  describe('create', () => {
    it('should create a new instance of category', () => {
      const newCategory = Category.create({
        name: 'Work',
        userId: '123',
      });

      expect(newCategory).toBeInstanceOf(Category);
    });
  });
});

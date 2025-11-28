import { CategoryRepository } from './category.repository';
import { Category } from '../../domain/entities/category.entity';
import { Test } from '@nestjs/testing';
import { DatabaseService } from 'src/database/database.service';

interface MockedDatabaseService {
  category: {
    create: jest.Mock;
    findMany: jest.Mock;
    findUnique: jest.Mock;
    findFirst: jest.Mock;
    update: jest.Mock;
  };
}

describe('CategoryRepository', () => {
  let mockedDatabaseService: MockedDatabaseService;

  let categoryRepository: CategoryRepository;

  beforeEach(async () => {
    mockedDatabaseService = {
      category: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        CategoryRepository,
        {
          provide: DatabaseService,
          useValue: mockedDatabaseService,
        },
      ],
    }).compile();

    categoryRepository = module.get<CategoryRepository>(CategoryRepository);
  });

  describe('createOne', () => {
    it('should create a new category and return domain entity', async () => {
      const newCategory = Category.create({
        name: 'Test Category',
        userId: '123',
      });

      const databaseResult = {
        id: '123',
        name: 'Test Category',
        userId: '123',
        createdAt: new Date(),
      };

      mockedDatabaseService.category.create.mockResolvedValue(databaseResult);

      const result = await categoryRepository.createOne(newCategory);

      expect(result.name).toBe('Test Category');
    });
  });

  describe('findUserCategories', () => {
    it('should return an array of category domain entities if found', async () => {
      const userId = '123';

      const databaseResult = [
        {
          id: '123',
          name: 'Category 1',
          userId: userId,
          createdAt: new Date(),
        },
        {
          id: '1234',
          name: 'Category 2',
          userId: userId,
          createdAt: new Date(),
        },
      ];

      mockedDatabaseService.category.findMany.mockResolvedValue(databaseResult);

      const result = await categoryRepository.findUserCategories(userId);

      expect(result).toHaveLength(2);
    });

    it('should return null if no categories found', async () => {
      mockedDatabaseService.category.findMany.mockResolvedValue([]);

      const result = await categoryRepository.findUserCategories('user-id');

      expect(result).toBeNull();
    });
  });

  describe('findById', () => {
    it('should find and return category', async () => {
      const userId = '123';

      const databaseResult = {
        id: '123',
        name: 'Category 1',
        userId: userId,
        createdAt: new Date(),
      };

      mockedDatabaseService.category.findUnique.mockResolvedValue(
        databaseResult,
      );

      const result = await categoryRepository.findById(userId);

      expect(result.name).toBe(databaseResult.name);
    });
  });

  describe('findByName', () => {
    it('should find and return category', async () => {
      const name = 'shopping';

      const databaseResult = {
        id: '123',
        name: name,
        userId: '123',
        createdAt: new Date(),
      };

      mockedDatabaseService.category.findFirst.mockResolvedValue(
        databaseResult,
      );

      const result = await categoryRepository.findByName(name);

      expect(result.name).toBe(databaseResult.name);
    });
    it('should be return null', async () => {
      mockedDatabaseService.category.findFirst.mockResolvedValue(null);

      const result = await categoryRepository.findByName('shopping');

      expect(result).toBeNull();
    });
  });

  describe('updateById', () => {
    it('should be update category', async () => {
      const category = Category.create({
        name: 'Test Category',
        userId: '123',
      });

      category.changeName('new name');

      const databaseResult = {
        id: '1234',
        name: 'new name',
        userId: '123',
      };

      mockedDatabaseService.category.update.mockResolvedValue(databaseResult);
    });
  });
});

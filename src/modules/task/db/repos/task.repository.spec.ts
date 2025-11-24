import { TaskRepository } from './task.repository';
import { Task } from '../../domain/entities/task.entity';
import { Test } from '@nestjs/testing';
import { DatabaseService } from 'src/database/database.service';
import { TaskPriority } from '../../domain/entities/enums';

interface MockedDatabaseService {
  task: {
    create: jest.Mock;
    findMany: jest.Mock;
    delete: jest.Mock;
  };
}

describe('TaskRepository', () => {
  let mockedDatabaseService: MockedDatabaseService;

  let taskRepository: TaskRepository;

  beforeEach(async () => {
    mockedDatabaseService = {
      task: {
        create: jest.fn(),
        findMany: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        TaskRepository,
        {
          provide: DatabaseService,
          useValue: mockedDatabaseService,
        },
      ],
    }).compile();

    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  describe('createOne', () => {
    it('should create a new task and return domain entity', async () => {
      const newTask = Task.create({
        title: 'Test Task',
        description: 'Test Description',
        priority: TaskPriority.High,
        dueDate: new Date(),
        userId: 'user-id',
        categoryId: 'category-id',
      });

      const databaseResult = {
        id: '123',
        title: 'Test Task',
        description: 'Test Description',
        status: 'PENDING',
        priority: 'HGIH',
        dueDate: new Date(),
        userId: '123',
        categoryId: '123',
        createdAt: new Date(),
        subTasks: [],
      };

      mockedDatabaseService.task.create.mockResolvedValue(databaseResult);

      const result = await taskRepository.createOne(newTask);

      expect(result.title).toBe('Test Task');
    });
  });

  describe('findUserTasks', () => {
    it('should return an array of task domain entities if found', async () => {
      const userId = '123';

      const databaseResult = [
        {
          id: '123',
          title: 'Task 1',
          description: 'Description 1',
          status: 'PENDING',
          priority: 'LOW',
          dueDate: new Date(),
          userId: userId,
          categoryId: '123',
          createdAt: new Date(),
          subTasks: [],
        },
        {
          id: '1234',
          title: 'Task 2',
          description: 'Description 2',
          status: 'COMPLETED',
          priority: 'HGIH',
          dueDate: new Date(),
          userId: userId,
          categoryId: '123',
          createdAt: new Date(),
          subTasks: [],
        },
      ];

      mockedDatabaseService.task.findMany.mockResolvedValue(databaseResult);

      const result = await taskRepository.findUserTasks(userId);

      expect(result).toHaveLength(2);
    });

    it('should return null if no tasks found', async () => {
      mockedDatabaseService.task.findMany.mockResolvedValue([]);

      const result = await taskRepository.findUserTasks('123');

      expect(result).toBeNull();
    });
  });

  describe('deleteUserTaskById', () => {
    it('should be delete task', async () => {
      await expect(
        taskRepository.deleteUserTaskById('abcd', 'abcd'),
      ).resolves.toBeUndefined();
    });
  });
});

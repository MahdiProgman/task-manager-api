import { DatabaseService } from '../../../../database/database.service';
import { UserRepository } from './user.repository';
import { User } from '../../domain/entities/user.entity';

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  })),
}));

describe('UserRepository', () => {
  let databaseService: DatabaseService;
  let repo: UserRepository;

  beforeEach(() => {
    databaseService = new DatabaseService();
    repo = new UserRepository(databaseService);
  });

  describe('createOne', () => {
    it('should be create a new user successfully', async () => {
      const user = new User({
        email: 'mahdi@gmail.com',
        firstName: 'mahdi',
        lastName: 'habibKhah',
        password: 'hashed_password',
      });

      (databaseService.user.create as jest.Mock).mockResolvedValue(
        new User({
          id: 'abcd-efgh-ijkl-mnop',
          email: 'mahdi@gmail.com',
          firstName: 'mahdi',
          lastName: 'habibKhah',
          password: 'hashed_password',
          createdAt: new Date(),
        }),
      );

      const result = await repo.createOne(user);

      expect(result.id).toBe('abcd-efgh-ijkl-mnop');
    });
  });
  describe('findById', () => {
    it('should be find user by id successfully', async () => {
      (databaseService.user.findUnique as jest.Mock).mockResolvedValue(
        new User({
          id: 'abcd-efgh-ijkl-mnop',
          email: 'mahdi@gmail.com',
          firstName: 'mahdi',
          lastName: 'habibKhah',
          password: 'hashed_password',
          createdAt: new Date(),
        }),
      );

      const result = await repo.findById('abcd-efgh-ijkl-mnop');

      expect(result.id).toBe('abcd-efgh-ijkl-mnop');
    });
  });
});

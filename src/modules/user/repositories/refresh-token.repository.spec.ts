import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshToken } from '../entities/refresh-token.entity';
import { Test } from '@nestjs/testing';
import { DatabaseService } from 'src/database/database.service';

interface MockedDatabaseService {
  refreshToken: {
    create: jest.Mock;
    findUnique: jest.Mock;
  };
}

describe('RefreshTokenRepository', () => {
  let mockedDatabaseService: MockedDatabaseService;

  let refreshTokenRepository: RefreshTokenRepository;

  beforeEach(async () => {
    mockedDatabaseService = {
      refreshToken: {
        create: jest.fn(),
        findUnique: jest.fn(),
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        RefreshTokenRepository,
        {
          provide: DatabaseService,
          useValue: mockedDatabaseService,
        },
      ],
    }).compile();

    refreshTokenRepository = module.get<RefreshTokenRepository>(
      RefreshTokenRepository,
    );
  });

  describe('createOne', () => {
    it('should create a new refresh token and return domain entity', async () => {
      const newRefreshToken = RefreshToken.create({
        userId: 'user-id',
        refreshToken: 'refresh-token-value',
      });

      const databaseResult = {
        id: 'token-id',
        userId: 'user-id',
        refreshToken: 'refresh-token-value',
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockedDatabaseService.refreshToken.create.mockResolvedValue(
        databaseResult,
      );

      const result = await refreshTokenRepository.createOne(newRefreshToken);

      expect(result.refreshToken).toBe('refresh-token-value');
    });
  });

  describe('findByToken', () => {
    it('should return a RefreshToken domain entity if found', async () => {
      const token = 'find-me-token';

      const databaseResult = {
        id: 'test-id',
        userId: 'test-id',
        refreshToken: token,
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockedDatabaseService.refreshToken.findUnique.mockResolvedValue(
        databaseResult,
      );

      const result = await refreshTokenRepository.findByToken(token);

      expect(result.refreshToken).toBe(token);
    });

    it('should return null if not found', async () => {
      mockedDatabaseService.refreshToken.findUnique.mockResolvedValue(null);

      const result =
        await refreshTokenRepository.findByToken('non-existent-token');

      expect(result).toBeNull();
    });
  });
});

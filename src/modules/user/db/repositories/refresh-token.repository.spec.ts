import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshToken } from '../../domain/entities/refresh-token.entity';
import { Test } from '@nestjs/testing';
import { DatabaseService } from 'src/database/database.service';

interface MockedDatabaseService {
  refreshToken: {
    create: jest.Mock;
    findUnique: jest.Mock;
    update: jest.Mock;
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
        update: jest.fn(),
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

  describe('updateById', () => {
    it('should create new refresh token and update it', async () => {
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

      const createdRefreshToken =
        await refreshTokenRepository.createOne(newRefreshToken);

      const rotatedRefreshToken = createdRefreshToken.withRotation('new_token');

      databaseResult.refreshToken = rotatedRefreshToken.refreshToken;

      mockedDatabaseService.refreshToken.update.mockResolvedValue(
        databaseResult,
      );

      const result = await refreshTokenRepository.updateById(
        newRefreshToken.id,
        rotatedRefreshToken,
      );

      expect(result.refreshToken).toBe(rotatedRefreshToken.refreshToken);
    });
  });

  describe('findByToken', () => {
    it('should return a RefreshToken domain entity if found', async () => {
      const id = 'token-id';

      const databaseResult = {
        id: id,
        userId: 'test-id',
        refreshToken: 'refresh-token',
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockedDatabaseService.refreshToken.findUnique.mockResolvedValue(
        databaseResult,
      );

      const result = await refreshTokenRepository.findById(id);

      expect(result.id).toBe(id);
    });

    it('should return null if not found', async () => {
      mockedDatabaseService.refreshToken.findUnique.mockResolvedValue(null);

      const result = await refreshTokenRepository.findById('non-existent-id');

      expect(result).toBeNull();
    });
  });
});

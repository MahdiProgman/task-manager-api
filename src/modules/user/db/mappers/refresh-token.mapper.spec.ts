import { RefreshToken as RefreshTokenPersistenceEntity } from '@prisma/client';
import { RefreshToken as RefreshTokenDomainEntity } from '../../domain/entities/refresh-token.entity';
import { RefreshTokenMapper } from './refresh-token.mapper';

const refreshTokenPersistenceEntity: RefreshTokenPersistenceEntity = {
  id: 'test-id',
  userId: 'test-user-id',
  refreshToken: 'persistence_refresh_token',
  expiresAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date('2024-01-02T00:00:00.000Z'),
};

const refreshTokenDomainEntity: RefreshTokenDomainEntity =
  RefreshTokenDomainEntity.create({
    id: 'test-id',
    userId: 'test-user-id',
    refreshToken: 'domain_refresh_token',
    expiresAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date('2024-01-02T00:00:00.000Z'),
  });

describe('RefreshTokenMapper', () => {
  describe('toDomain', () => {
    it('should be convert refresh token persistence entity to refresh token domain entity', () => {
      const refreshToken = RefreshTokenMapper.toDomain(
        refreshTokenPersistenceEntity,
      );

      expect(refreshToken.refreshToken).toBe('persistence_refresh_token');
    });
  });
  describe('toPersistence', () => {
    it('should be convert refresh token domain entity to refresh token persistence entity', () => {
      const refreshToken = RefreshTokenMapper.toPersistence(
        refreshTokenDomainEntity,
      );

      expect(refreshToken.refreshToken).toBe('domain_refresh_token');
    });
  });
});

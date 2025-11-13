import {
  Prisma,
  RefreshToken as RefreshTokenPersistenceEntity,
} from '@prisma/client';
import { RefreshToken as RefreshTokenDomainEntity } from '../entities/refresh-token.entity';

export class RefreshTokenMapper {
  static toDomain(
    persistence: RefreshTokenPersistenceEntity,
  ): RefreshTokenDomainEntity {
    return new RefreshTokenDomainEntity({
      id: persistence.id,
      userId: persistence.userId,
      refreshToken: persistence.refreshToken,
      expiresAt: persistence.expiresAt,
      createdAt: persistence.createdAt,
      updatedAt: persistence.updatedAt,
    });
  }

  static toPersistence(
    domain: RefreshTokenDomainEntity,
  ): Prisma.RefreshTokenCreateInput {
    return {
      id: domain.id,
      refreshToken: domain.refreshToken,
      expiresAt: domain.expiresAt,
      createdAt: domain.createdAt!,
      updatedAt: domain.updatedAt!,
      user: {
        connect: {
          id: domain.userId,
        },
      },
    };
  }
}

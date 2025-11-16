import { DatabaseService } from 'src/database/database.service';
import { RefreshTokenRepository as IRefreshTokenRepository } from '../../domain/contracts/refresh-token.repository';
import { RefreshTokenMapper } from '../mappers/refresh-token.mapper';
import { RefreshToken } from '../../domain/entities/refresh-token.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async createOne(refreshToken: RefreshToken): Promise<RefreshToken> {
    const result = await this.databaseService.refreshToken.create({
      data: RefreshTokenMapper.toPersistence(refreshToken),
    });

    return RefreshTokenMapper.toDomain(result);
  }

  async findByToken(token: string): Promise<null | RefreshToken> {
    const refreshTokenFound =
      await this.databaseService.refreshToken.findUnique({
        where: { refreshToken: token },
      });

    return refreshTokenFound
      ? RefreshTokenMapper.toDomain(refreshTokenFound)
      : null;
  }
}

import { RefreshToken } from '../entities/refresh-token.entity';

export interface RefreshTokenRepository {
  createOne(refreshToken: RefreshToken): Promise<RefreshToken>;
  findByToken(token: string): Promise<null | RefreshToken>;
  updateById(id: string, refreshToken: RefreshToken): Promise<RefreshToken>;
  findById(id: string): Promise<null | RefreshToken>;
}

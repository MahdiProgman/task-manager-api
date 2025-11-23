export interface TokenPayload {
  userId: string;
  refreshTokenId: string;
}

export interface RefreshToken {
  hash: string;
  plain: string;
}

export interface TokenService {
  generateRefreshToken(): RefreshToken;
  hashRefreshToken(refreshToken: string): string;
  generateAccessToken(payload: TokenPayload): string;
  verifyAccessToken(token: string): TokenPayload;
}

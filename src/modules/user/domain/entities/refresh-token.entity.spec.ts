import { RefreshToken } from './refresh-token.entity';

describe('RefreshTokenEntity', () => {
  describe('create', () => {
    it('should be create a new instance of refresh token successfully', () => {
      const refreshToken = RefreshToken.create({
        userId: '123',
        refreshToken: '123',
      });

      expect(refreshToken).toBeInstanceOf(RefreshToken);
    });
  });
  describe('isExpired', () => {
    it('should be return true if the refresh token is expired', () => {
      const refreshToken = RefreshToken.create({
        userId: '123',
        refreshToken: '123',
        expiresAt: new Date(Date.now() - 1000),
      });

      expect(refreshToken.isExpired()).toBe(true);
    });
    it('should be return false if the refresh token is not expired', () => {
      const refreshToken = RefreshToken.create({
        userId: '123',
        refreshToken: '123',
        expiresAt: new Date(Date.now() + 1000),
      });

      expect(refreshToken.isExpired()).toBe(false);
    });
  });
  describe('withRotation', () => {
    it('should be return a new instance of refresh token with a new token', () => {
      const refreshToken = RefreshToken.create({
        userId: '123',
        refreshToken: '123',
      });

      const newRefreshToken = refreshToken.withRotation('456');

      expect(newRefreshToken.refreshToken).toBe('456');
    });
  });
});

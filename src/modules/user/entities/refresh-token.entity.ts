export interface RefreshTokenProps {
  id?: string;
  userId: string;
  refreshToken: string;
  expiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class RefreshToken {
  public readonly id?: string;
  public readonly userId: string;
  public readonly refreshToken: string;
  public readonly expiresAt: Date;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  private static REFRESH_TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7; // 7 days

  constructor(props: RefreshTokenProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.refreshToken = props.refreshToken;
    this.expiresAt = props.expiresAt ?? this.getExpireDate();
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  public isExpired() {
    return this.expiresAt < new Date();
  }

  public static create(props: RefreshTokenProps) {
    const refreshToken = new RefreshToken(props);
    return refreshToken;
  }

  public getExpireDate() {
    return new Date(Date.now() + RefreshToken.REFRESH_TOKEN_EXPIRATION_TIME);
  }

  public withRotation(newToken: string) {
    return new RefreshToken({
      ...this,
      refreshToken: newToken,
      expiresAt: this.getExpireDate(),
    });
  }
}
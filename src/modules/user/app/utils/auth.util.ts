import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CONFIG_SERVICE } from 'src/config/constants';
import { ConfigService } from 'src/config/contracts/config.service';
import * as crypto from 'crypto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthUtils {
  private readonly _jwtSecret: string;

  constructor(@Inject(CONFIG_SERVICE) configService: ConfigService) {
    this._jwtSecret = configService.getAppConfig().jwt_secret;
  }

  public generateRefreshToken() {
    const refreshToken = crypto.randomBytes(64).toString('hex');

    return refreshToken;
  }

  public generateAccessToken(userId: string, refreshTokenId: string) {
    const accessToken = jwt.sign(
      {
        userId: userId,
        refreshTokenId: refreshTokenId,
      },
      this._jwtSecret,
      {
        expiresIn: '15m',
      },
    );

    return accessToken;
  }

  public async hash(plainText: string): Promise<string> {
    const hashedText = await argon2.hash(plainText);

    return hashedText;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import {
  RefreshToken,
  TokenPayload,
  TokenService,
} from '../interfaces/token.service.interface';
import { CONFIG_SERVICE } from 'src/config/constants';
import { ConfigService } from 'src/config/contracts/config.service';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtTokenService implements TokenService {
  private readonly _jwtSecret: string;

  constructor(@Inject(CONFIG_SERVICE) configService: ConfigService) {
    this._jwtSecret = configService.getAppConfig().jwt_secret;
  }

  public generateRefreshToken(): RefreshToken {
    const refreshToken = crypto.randomBytes(64).toString('base64');
    const hashedRefreshToken = this.hashRefreshToken(refreshToken);

    return {
      hash: hashedRefreshToken,
      plain: refreshToken,
    };
  }

  public hashRefreshToken(refreshToken: string): string {
    const hashedRefreshToken = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('base64');

    return hashedRefreshToken;
  }

  public generateAccessToken(payload: TokenPayload): string {
    const accessToken = jwt.sign(
      {
        userId: payload.userId,
        refreshTokenId: payload.refreshTokenId,
      },
      this._jwtSecret,
      {
        expiresIn: '15m',
      },
    );

    return accessToken;
  }

  public verifyAccessToken(token: string): TokenPayload {
    const decoddedAccessToken = jwt.verify(token, this._jwtSecret);

    return decoddedAccessToken as TokenPayload;
  }
}

import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { REFRESH_TOKEN_REPOSITORY, USER_REPOSITORY } from './constants';
import { UserRepository } from './db/repositories/user.repository';
import { RefreshTokenRepository } from './db/repositories/refresh-token.repository';
import { AuthService } from './app/services/auth.service';
import { AuthController } from './app/controllers/auth.controller';
import { ConfigModule } from 'src/config/config.module';
import { HASHING_SERVICE, TOKEN_SERVICE } from 'src/common/services/constants';
import { JwtTokenService } from 'src/common/services/implemented/jwt-token.service';
import { Argon2HashingService } from 'src/common/services/implemented/argon-2-hashing.service';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [AuthController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: REFRESH_TOKEN_REPOSITORY,
      useClass: RefreshTokenRepository,
    },
    {
      provide: TOKEN_SERVICE,
      useClass: JwtTokenService,
    },
    {
      provide: HASHING_SERVICE,
      useClass: Argon2HashingService,
    },
    AuthService,
  ],
})
export class UserModule {}

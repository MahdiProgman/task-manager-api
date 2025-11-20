import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { REFRESH_TOKEN_REPOSITORY, USER_REPOSITORY } from './constants';
import { UserRepository } from './db/repositories/user.repository';
import { RefreshTokenRepository } from './db/repositories/refresh-token.repository';
import { AuthUtils } from './app/utils/auth.util';
import { AuthService } from './app/services/auth.service';
import { AuthController } from './app/controllers/auth.controller';
import { ConfigModule } from 'src/config/config.module';

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
    AuthUtils,
    AuthService,
  ],
})
export class UserModule {}

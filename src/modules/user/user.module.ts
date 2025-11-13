import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { REFRESH_TOKEN_REPOSITORY, USER_REPOSITORY } from './constants';
import { UserRepository } from './repositories/user.repository';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: REFRESH_TOKEN_REPOSITORY,
      useClass: RefreshTokenRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { USER_REPOSITORY } from './constants';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}

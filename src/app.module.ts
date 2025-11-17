import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

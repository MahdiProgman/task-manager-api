import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import {
  CATEGORY_REPOSITORY,
  TASK_QUERY_REPOSITORY,
  TASK_REPOSITORY,
} from './constants';
import { TaskRepository } from './db/repos/task.repository';
import { CategoryRepository } from './db/repos/category.repository';
import { TaskQueryRepository } from './db/repos/task-query.repository';
import { TaskService } from './app/services/task.service';
import { TaskController } from './app/controllers/task.controller';
import { TOKEN_SERVICE } from 'src/common/services/constants';
import { JwtTokenService } from 'src/common/services/implemented/jwt-token.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [TaskController],
  providers: [
    {
      provide: TASK_REPOSITORY,
      useClass: TaskRepository,
    },
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoryRepository,
    },
    {
      provide: TASK_QUERY_REPOSITORY,
      useClass: TaskQueryRepository,
    },
    {
      provide: TOKEN_SERVICE,
      useClass: JwtTokenService,
    },
    TaskService,
  ],
})
export class TaskModule {}

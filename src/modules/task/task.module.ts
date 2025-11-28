import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import {
  CATEGORY_QUERY_REPOSITORY,
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
import { CategoryController } from './app/controllers/category.controller';
import { CategoryService } from './app/services/category.service';
import { CategoryQueryRepository } from './db/repos/category-query.repository';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [TaskController, CategoryController],
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
      provide: CATEGORY_QUERY_REPOSITORY,
      useClass: CategoryQueryRepository,
    },
    {
      provide: TOKEN_SERVICE,
      useClass: JwtTokenService,
    },
    TaskService,
    CategoryService,
  ],
})
export class TaskModule {}

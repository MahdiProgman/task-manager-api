import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CATEGORY_REPOSITORY, TASK_REPOSITORY } from './constants';
import { TaskRepository } from './db/repos/task.repository';
import { CategoryRepository } from './db/repos/category.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: TASK_REPOSITORY,
      useClass: TaskRepository,
    },
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoryRepository,
    },
  ],
})
export class TaskModule {}

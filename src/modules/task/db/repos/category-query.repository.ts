import { DatabaseService } from 'src/database/database.service';
import { CategoryQueryRepository as ICategoryQueryRepository } from '../../app/repos/category-query.repository';
import { CategoryQueryDto } from '../../app/repos/queries/category-query.dto';
import { TaskPriority, TaskStatus } from '../../domain/entities/enums';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryQueryRepository implements ICategoryQueryRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async getCategory(id: string): Promise<CategoryQueryDto> {
    const category = await this.databaseService.category.findUnique({
      where: {
        id: id,
      },
      include: {
        tasks: {
          include: {
            subTasks: true,
          },
        },
      },
    });

    return {
      name: category.name,
      tasks: category.tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority as TaskPriority,
        status: task.status as TaskStatus,
        dueDate: task.dueDate,
        categoryName: category.name,
        createdAt: task.createdAt,
        subTasks: task.subTasks.map((subTask) => ({
          id: subTask.id,
          title: subTask.title,
          status: subTask.status as TaskStatus,
          createdAt: subTask.createdAt,
        })),
      })),
    };
  }
}

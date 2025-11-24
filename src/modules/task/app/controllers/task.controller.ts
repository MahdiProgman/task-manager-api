import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Request } from 'express';
import { SuccessResponse } from 'src/common/types';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  public async getAllTasks(@Req() req: Request): Promise<SuccessResponse> {
    const tasks = await this.taskService.getAllTasks(req.userId);

    return {
      statusCode: 200,
      data: tasks,
    };
  }
}

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Request } from 'express';
import { SuccessResponse } from 'src/common/types';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetAllTasksResponse } from './responses/get-all-tasks-response.dto';
import { CreateTaskDto } from '../dtos/create-task.dto';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOkResponse({ type: [GetAllTasksResponse] })
  @Get()
  public async getAllTasks(@Req() req: Request): Promise<SuccessResponse> {
    const tasks = await this.taskService.getAllTasks(req.userId);

    return {
      statusCode: 200,
      data: tasks,
    };
  }

  @Post('new')
  public async createNewTask(
    @Req() req: Request,
    @Body() dto: CreateTaskDto,
  ): Promise<SuccessResponse> {
    const newTask = await this.taskService.createNewTask(req.userId, dto);

    return {
      statusCode: 201,
      data: newTask,
    };
  }
}

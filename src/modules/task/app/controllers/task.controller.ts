import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Request } from 'express';
import { SuccessResponse } from 'src/common/types';
import { AuthGuard } from 'src/common/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { GetAllTasksResponse } from './responses/get-all-tasks-response.dto';
import { CreateTaskDto } from '../dtos/create-task.dto';
import {
  buildFailedResponse,
  buildSuccessResponse,
} from 'src/common/tools/swagger';
import { CreateTaskResponse } from './responses/create-task.dto';
import { CategoryNotFoundError } from '../exceptions/category-not-found.exception';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { UpdateTaskResponse } from './responses/update-task-response.dto';
import { TaskNotFoundError } from '../exceptions/task-not-found.exception';

@ApiBearerAuth()
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

  @ApiCreatedResponse({
    type: CreateTaskResponse,
  })
  @ApiNotFoundResponse({
    example: buildFailedResponse(new CategoryNotFoundError()),
  })
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

  @ApiOkResponse({ example: buildSuccessResponse({ data: null }) })
  @Delete(':id')
  public async removeTask(@Req() req: Request): Promise<SuccessResponse> {
    await this.taskService.removeTask(req.userId, req.params.id);

    return {
      statusCode: 200,
    };
  }

  @ApiOkResponse({ type: UpdateTaskResponse })
  @ApiNotFoundResponse({
    description: 'task not found',
    example: buildFailedResponse(new TaskNotFoundError()),
  })
  @ApiNotFoundResponse({
    description: 'category not found',
    example: buildFailedResponse(new CategoryNotFoundError()),
  })
  @Put(':id')
  public async updateTask(
    @Req() req: Request,
    @Body() dto: UpdateTaskDto,
  ): Promise<SuccessResponse> {
    const updatedTask = await this.taskService.updateTask(
      {
        id: req.params.id,
        userId: req.userId,
      },
      dto,
    );

    return {
      statusCode: 200,
      data: updatedTask,
    };
  }
}

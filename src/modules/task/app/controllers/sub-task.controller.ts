import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateSubTaskDto } from '../dtos/subtasks/create-sub-task.dto';
import { SubTaskService } from '../services/sub-task.service';
import { SuccessResponse } from 'src/common/types';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  buildFailedResponse,
  buildSuccessResponse,
} from 'src/common/tools/swagger';
import { TaskNotFoundError } from '../exceptions/tasks/task-not-found.exception';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UpdateSubTaskDto } from '../dtos/subtasks/update-sub-task.dto';
import { SubTaskNotFoundError } from '../exceptions/subtasks/sub-task-not-found.exception';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tasks/:id/subtasks')
export class SubTaskController {
  constructor(private readonly subTaskService: SubTaskService) {}

  @ApiCreatedResponse({ example: buildSuccessResponse({ statusCode: 201 }) })
  @ApiNotFoundResponse({
    example: buildFailedResponse(new TaskNotFoundError()),
  })
  @Post('new')
  public async createNewSubTask(
    @Req() req: Request,
    @Body() dto: CreateSubTaskDto,
  ): Promise<SuccessResponse> {
    await this.subTaskService.addSubTask(
      {
        userId: req.userId,
        taskId: req.params.id,
      },
      dto,
    );

    return {
      statusCode: 201,
    };
  }

  @ApiOkResponse({ example: buildSuccessResponse({}) })
  @ApiNotFoundResponse({
    example: buildFailedResponse(new TaskNotFoundError()),
  })
  @ApiNotFoundResponse({
    example: buildFailedResponse(new SubTaskNotFoundError()),
  })
  @Put(':subtask_id')
  public async updateSubTask(
    @Req() req: Request,
    @Body() dto: UpdateSubTaskDto,
  ): Promise<SuccessResponse> {
    await this.subTaskService.updateSubTask(
      {
        userId: req.userId,
        taskId: req.params.id,
        subTaskId: req.params.subtask_id,
      },
      dto,
    );

    return {
      statusCode: 200,
    };
  }

  @ApiOkResponse({ example: buildSuccessResponse({}) })
  @ApiNotFoundResponse({
    example: buildFailedResponse(new TaskNotFoundError()),
  })
  @ApiNotFoundResponse({
    example: buildFailedResponse(new SubTaskNotFoundError()),
  })
  @Delete(':subtask_id')
  public async deleteSubTask(@Req() req: Request): Promise<SuccessResponse> {
    await this.subTaskService.deleteSubTask({
      userId: req.userId,
      taskId: req.params.id,
      subTaskId: req.params.subtask_id,
    });

    return {
      statusCode: 200,
    };
  }
}

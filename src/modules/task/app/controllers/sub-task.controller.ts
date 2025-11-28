import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CreateSubTaskDto } from '../dtos/subtasks/create-sub-task.dto';
import { SubTaskService } from '../services/sub-task.service';
import { SuccessResponse } from 'src/common/types';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import {
  buildFailedResponse,
  buildSuccessResponse,
} from 'src/common/tools/swagger';
import { TaskNotFoundError } from '../exceptions/tasks/task-not-found.exception';
import { AuthGuard } from 'src/common/guards/auth.guard';

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
}

import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '../../../domain/entities/enums';
import { SubTaskQueryDto } from './sub-task-query.dto';

export class TaskQueryDto {
  @ApiProperty({
    example: 'task-id',
  })
  id: string;

  @ApiProperty({
    example: 'go to supermarket',
  })
  title: string;

  @ApiProperty({
    example: 'go to supermarket at 9AM',
  })
  description: string;

  @ApiProperty({
    enum: TaskPriority,
    example: TaskPriority.High,
  })
  priority: TaskPriority;

  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.Completed,
  })
  status: TaskStatus;

  @ApiProperty({
    example: new Date(),
  })
  dueDate: Date;

  @ApiProperty({
    example: 'buy',
  })
  categoryName: string;

  @ApiProperty({
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({ type: [SubTaskQueryDto] })
  subTasks: SubTaskQueryDto[];
}

import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '../../../domain/entities/enums';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'task title',
    example: 'go to supermarket',
    required: true,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'task description',
    example: 'go to supermarket at 3AM',
    required: true,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'task priority',
    example: TaskPriority.High,
    required: true,
    enum: TaskPriority,
  })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiProperty({
    description: 'task status',
    example: TaskStatus.Completed,
    required: true,
    enum: TaskStatus,
  })
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  @ApiProperty({
    description: 'task due date',
    example: new Date(),
    required: true,
  })
  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @ApiProperty({
    description: 'category id',
    example: 'category-id',
    required: true,
  })
  @IsOptional()
  @IsString()
  categoryId?: string;
}

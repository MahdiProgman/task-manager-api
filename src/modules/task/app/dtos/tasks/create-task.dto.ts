import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority } from '../../../domain/entities/enums';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'task title',
    example: 'go to supermarket',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'task description',
    example: 'go to supermarket at 3AM',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'task priority',
    example: TaskPriority.High,
    required: true,
    enum: TaskPriority,
  })
  @IsNotEmpty()
  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @ApiProperty({
    description: 'task due date',
    example: new Date(),
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;

  @ApiProperty({
    description: 'category id',
    example: 'category-id',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from 'src/modules/task/domain/entities/enums';

export class UpdateSubTaskDto {
  @ApiProperty({
    description: 'the sub task title',
    example: 'go to supermarket',
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'the sub task status',
    enum: TaskStatus,
    example: TaskStatus.Completed,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

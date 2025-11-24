import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../../../domain/entities/enums';

export class SubTaskQueryDto {
  @ApiProperty({
    example: 'sub-task-id',
  })
  id: string;

  @ApiProperty({
    example: 'go to supermarket',
  })
  title: string;

  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.Completed,
  })
  status: TaskStatus;

  @ApiProperty({
    example: new Date(),
  })
  createdAt: Date;
}

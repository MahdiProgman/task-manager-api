import { ApiProperty } from '@nestjs/swagger';
import { TaskQueryDto } from './task-query.dto';

export class CategoryQueryDto {
  @ApiProperty({
    example: 'shopping',
  })
  name: string;

  @ApiProperty({ type: [TaskQueryDto] })
  tasks: TaskQueryDto[];
}

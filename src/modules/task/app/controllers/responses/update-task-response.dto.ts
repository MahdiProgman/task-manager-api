import { ApiProperty } from '@nestjs/swagger';
import { TaskQueryDto } from '../../repos/queries/task-query.dto';

export class UpdateTaskResponse {
  @ApiProperty({
    example: true,
  })
  success: true;

  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: 'success',
  })
  message: string;

  @ApiProperty({ type: TaskQueryDto })
  data: TaskQueryDto;
}

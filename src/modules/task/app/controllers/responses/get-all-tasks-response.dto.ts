import { TaskQueryDto } from '../../repos/queries/task-query.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllTasksResponse {
  success: true;
  statusCode: number;
  message: string;
  @ApiProperty({ type: [TaskQueryDto] })
  data: TaskQueryDto[];
}

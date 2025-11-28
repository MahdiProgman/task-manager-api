import { ApiProperty } from '@nestjs/swagger';
import { CategoryQueryDto } from '../../../repos/queries/category-query.dto';

export class GetCategoryResponse {
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

  @ApiProperty({ type: CategoryQueryDto })
  data: CategoryQueryDto;
}

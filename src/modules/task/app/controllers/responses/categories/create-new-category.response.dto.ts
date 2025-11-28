import { ApiProperty } from '@nestjs/swagger';

class CategoryDto {
  @ApiProperty({
    example: 'category-id',
  })
  id: string;

  @ApiProperty({
    example: 'shopping',
  })
  name: string;

  @ApiProperty({
    example: new Date(),
  })
  createdAt: string;
}

export class CreateNewCategoryResponse {
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

  @ApiProperty({ type: CategoryDto })
  data: CategoryDto;
}

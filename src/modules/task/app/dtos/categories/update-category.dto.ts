import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'the category name',
    example: 'shopping',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

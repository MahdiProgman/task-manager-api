import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubTaskDto {
  @ApiProperty({
    description: 'the sub task title',
    example: 'go to supermarket',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}

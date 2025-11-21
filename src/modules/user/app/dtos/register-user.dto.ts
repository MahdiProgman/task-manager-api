import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 15)
  @ApiProperty({
    description: 'the first name of user',
    example: 'Rick',
    required: true,
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  @ApiProperty({
    description: 'the last name of user',
    example: 'Sanchez',
    required: true,
  })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}

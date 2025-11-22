import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { SuccessResponse } from 'src/common/types';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  buildFailedResponse,
  buildSuccessResponse,
} from 'src/common/tools/swagger';
import { EmailIsAlreadyTakenError } from '../exceptions/email-is-already-taken.exception';
import { LoginUserDto } from '../dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'register a new user',
  })
  @ApiResponse({
    description: 'user registered successfuly',
    status: 201,
    example: buildSuccessResponse({
      statusCode: 201,
      data: {
        accessToken: 'access_token',
      },
    }),
  })
  @ApiResponse({
    description: 'email already taken',
    status: 409,
    example: buildFailedResponse(new EmailIsAlreadyTakenError()),
  })
  public async register(
    @Body() dto: RegisterUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SuccessResponse> {
    const result = await this.authService.register(dto);

    res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      priority: 'high',
      path: '/api/auth/access-token',
    });

    return {
      statusCode: 201,
      data: {
        accessToken: result.accessToken,
      },
    };
  }

  @Post('login')
  public async login(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SuccessResponse> {
    const result = await this.authService.login(dto);

    res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      priority: 'high',
      path: '/api/auth/access-token',
    });

    return {
      statusCode: 201,
      data: {
        accessToken: result.accessToken,
      },
    };
  }
}

import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { SuccessResponse } from 'src/common/types';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
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
}

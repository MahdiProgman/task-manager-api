import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { SuccessResponse } from 'src/common/types';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  buildFailedResponse,
  buildSuccessResponse,
} from 'src/common/tools/swagger';
import { EmailIsAlreadyTakenError } from '../exceptions/email-is-already-taken.exception';
import { LoginUserDto } from '../dtos/login-user.dto';
import { EmailOrPasswordIsIncorrect } from '../exceptions/email-or-password-is-incorrect.exception';
import { RefreshTokenIsMissing } from '../exceptions/refresh-token-is-missing.exception';
import { RefreshTokenIsInvalidOrExpired } from '../exceptions/refresh-token-is-invalid-or-expired.exception';

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

  @ApiOperation({
    summary: 'login to the system',
  })
  @ApiResponse({
    description: 'login was successfull',
    status: 201,
    example: buildSuccessResponse({
      statusCode: 201,
      data: {
        accessToken: 'access_token',
      },
    }),
  })
  @ApiResponse({
    description: 'email or password is incorrect',
    status: 401,
    example: buildFailedResponse(new EmailOrPasswordIsIncorrect()),
  })
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

  @ApiOperation({
    summary: 'refresh the access token',
  })
  @ApiResponse({
    description: 'generated a new access token successfully',
    status: 200,
    example: buildSuccessResponse({
      statusCode: 200,
      data: {
        accessToken: 'access_token',
      },
    }),
  })
  @ApiResponse({
    description: 'refresh token is missing',
    status: 401,
    example: buildFailedResponse(new RefreshTokenIsMissing()),
  })
  @ApiResponse({
    description: 'refresh token is invalid or expired',
    status: 401,
    example: buildFailedResponse(new RefreshTokenIsInvalidOrExpired()),
  })
  @Post('access-token')
  public async refreshAccessToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SuccessResponse> {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) throw new RefreshTokenIsMissing();

    const result = await this.authService.refreshAccessToken({
      refreshToken: refreshToken,
    });

    res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      priority: 'high',
      path: '/api/auth/access-token',
    });

    return {
      statusCode: 200,
      data: {
        accessToken: result.accessToken,
      },
    };
  }
}

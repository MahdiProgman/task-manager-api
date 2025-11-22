import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { REFRESH_TOKEN_REPOSITORY, USER_REPOSITORY } from '../../constants';
import { UserRepository } from '../../domain/contracts/user.repository';
import { EmailIsAlreadyTakenError } from '../exceptions/email-is-already-taken.exception';
import { RefreshTokenRepository } from '../../domain/contracts/refresh-token.repository';
import { RefreshToken } from '../../domain/entities/refresh-token.entity';
import { AuthUtils } from '../utils/auth.util';
import { User } from '../../domain/entities/user.entity';
import { LoginUserDto } from '../dtos/login-user.dto';
import { EmailOrPasswordIsIncorrect } from '../exceptions/email-or-password-is-incorrect.exception';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepo: RefreshTokenRepository,
    private readonly authUtils: AuthUtils,
  ) {}

  public async register(dto: RegisterUserDto) {
    const userFound = await this.userRepo.findByEmail(dto.email);

    if (userFound) throw new EmailIsAlreadyTakenError();

    const hashedPassword = await this.authUtils.hash(dto.password);

    const newUser = await this.userRepo.createOne(
      User.create({
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        password: hashedPassword,
      }),
    );

    const refreshToken = this.authUtils.generateRefreshToken();
    const hashedRefreshToken = await this.authUtils.hash(refreshToken);

    const newRefreshTokenRecord = await this.refreshTokenRepo.createOne(
      RefreshToken.create({
        refreshToken: hashedRefreshToken,
        userId: newUser.id,
      }),
    );

    const accessToken = this.authUtils.generateAccessToken(
      newUser.id,
      newRefreshTokenRecord.id,
    );

    return {
      refreshToken: refreshToken,
      accessToken: accessToken,
    };
  }

  public async login(dto: LoginUserDto) {
    const userFound = await this.userRepo.findByEmail(dto.email);

    if (!userFound) throw new EmailOrPasswordIsIncorrect();

    const isPasswordMatch = await this.authUtils.compare(
      dto.password,
      userFound.password,
    );

    if (!isPasswordMatch) throw new EmailOrPasswordIsIncorrect();

    const refreshToken = this.authUtils.generateRefreshToken();
    const hashedRefreshToken = await this.authUtils.hash(refreshToken);

    const newRefreshTokenRecord = await this.refreshTokenRepo.createOne(
      RefreshToken.create({
        refreshToken: hashedRefreshToken,
        userId: userFound.id,
      }),
    );

    const accessToken = this.authUtils.generateAccessToken(
      userFound.id,
      newRefreshTokenRecord.id,
    );

    return {
      refreshToken: refreshToken,
      accessToken: accessToken,
    };
  }
}

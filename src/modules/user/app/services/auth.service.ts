import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { REFRESH_TOKEN_REPOSITORY, USER_REPOSITORY } from '../../constants';
import { UserRepository } from '../../domain/contracts/user.repository';
import { EmailIsAlreadyTakenError } from '../exceptions/email-is-already-taken.exception';
import { RefreshTokenRepository } from '../../domain/contracts/refresh-token.repository';
import { RefreshToken } from '../../domain/entities/refresh-token.entity';
import { User } from '../../domain/entities/user.entity';
import { LoginUserDto } from '../dtos/login-user.dto';
import { EmailOrPasswordIsIncorrect } from '../exceptions/email-or-password-is-incorrect.exception';
import { GenerateAccessTokenDto } from '../dtos/generate-access-token.dto';
import { RefreshTokenIsInvalidOrExpired } from '../exceptions/refresh-token-is-invalid-or-expired.exception';
import { HASHING_SERVICE, TOKEN_SERVICE } from 'src/common/services/constants';
import { TokenService } from 'src/common/services/interfaces/token.service.interface';
import { HashingService } from 'src/common/services/interfaces/hashing.service.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepo: RefreshTokenRepository,
    @Inject(TOKEN_SERVICE) private readonly tokenService: TokenService,
    @Inject(HASHING_SERVICE) private readonly hashingService: HashingService,
  ) {}

  public async register(dto: RegisterUserDto) {
    const userFound = await this.userRepo.findByEmail(dto.email);

    if (userFound) throw new EmailIsAlreadyTakenError();

    const hashedPassword = await this.hashingService.hash(dto.password);

    const newUser = await this.userRepo.createOne(
      User.create({
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        password: hashedPassword,
      }),
    );

    const refreshToken = this.tokenService.generateRefreshToken();

    const newRefreshTokenRecord = await this.refreshTokenRepo.createOne(
      RefreshToken.create({
        refreshToken: refreshToken.hash,
        userId: newUser.id,
      }),
    );

    const accessToken = this.tokenService.generateAccessToken({
      userId: newUser.id,
      refreshTokenId: newRefreshTokenRecord.id,
    });

    return {
      refreshToken: refreshToken.plain,
      accessToken: accessToken,
    };
  }

  public async login(dto: LoginUserDto) {
    const userFound = await this.userRepo.findByEmail(dto.email);

    if (!userFound) throw new EmailOrPasswordIsIncorrect();

    const isPasswordMatch = await this.hashingService.compare(
      dto.password,
      userFound.password,
    );

    if (!isPasswordMatch) throw new EmailOrPasswordIsIncorrect();

    const refreshToken = this.tokenService.generateRefreshToken();

    const newRefreshTokenRecord = await this.refreshTokenRepo.createOne(
      RefreshToken.create({
        refreshToken: refreshToken.hash,
        userId: userFound.id,
      }),
    );

    const accessToken = this.tokenService.generateAccessToken({
      userId: userFound.id,
      refreshTokenId: newRefreshTokenRecord.id,
    });

    return {
      refreshToken: refreshToken.plain,
      accessToken: accessToken,
    };
  }

  public async refreshAccessToken(dto: GenerateAccessTokenDto) {
    const hashedRefreshToken = this.tokenService.hashRefreshToken(
      dto.refreshToken,
    );

    const refreshTokenFound =
      await this.refreshTokenRepo.findByToken(hashedRefreshToken);

    if (!refreshTokenFound) throw new RefreshTokenIsInvalidOrExpired();

    if (refreshTokenFound.isExpired())
      throw new RefreshTokenIsInvalidOrExpired();

    const newRefreshToken = this.tokenService.generateRefreshToken();

    const newRefreshTokenEntity = refreshTokenFound.withRotation(
      newRefreshToken.hash,
    );

    await this.refreshTokenRepo.updateById(
      refreshTokenFound.id,
      newRefreshTokenEntity,
    );

    const accessToken = this.tokenService.generateAccessToken({
      userId: refreshTokenFound.userId,
      refreshTokenId: refreshTokenFound.id,
    });

    return {
      refreshToken: newRefreshToken.plain,
      accessToken: accessToken,
    };
  }
}

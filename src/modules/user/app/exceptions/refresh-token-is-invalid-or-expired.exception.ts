import { AppError } from 'src/common/exceptions/app-error.exception';

export class RefreshTokenIsInvalidOrExpired extends AppError {
  constructor() {
    super(
      401,
      'refresh token is invalid or expired',
      'REFRESH_TOKEN_IS_INVALID_OR_EXPIRED',
    );
  }
}

import { AppError } from 'src/common/exceptions/app-error.exception';

export class RefreshTokenIsMissing extends AppError {
  constructor() {
    super(401, 'refresh token is missing', 'REFRESH_TOKEN_IS_MISSING');
  }
}

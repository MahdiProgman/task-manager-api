import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { UnauthorizedError } from '../exceptions/unauthorized.exception';
import { TOKEN_SERVICE } from '../services/constants';
import {
  TokenPayload,
  TokenService,
} from '../services/interfaces/token.service.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(TOKEN_SERVICE) private readonly tokenService: TokenService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const accessToken = this.extractTokenFromHeader(req);

    if (!accessToken) throw new UnauthorizedError();

    let decoddedAccessToken: TokenPayload;

    try {
      decoddedAccessToken = this.tokenService.verifyAccessToken(accessToken);
    } catch {
      throw new UnauthorizedError();
    }

    req.userId = decoddedAccessToken.userId;
    req.refreshTokenId = decoddedAccessToken.refreshTokenId;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

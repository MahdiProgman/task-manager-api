import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { SuccessResponse } from 'src/common/types';

export class SuccessResponseHandlerInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const res = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((response: SuccessResponse): SuccessResponse => {
        res.status(response.statusCode ?? 200);

        return {
          success: true,
          statusCode: response.statusCode ?? 200,
          message: response.message ?? 'success',
          data: response.data ?? null,
        };
      }),
    );
  }
}

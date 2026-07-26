/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { SKIP_EMAIL_VERIFICATION_KEY } from '../decorators/skip-email-verification.decorator';

@Injectable()
export class VerifiedEmailInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // attached by JwtAuthGuard

    if (user) {
      const skip = this.reflector.get<boolean>(
        SKIP_EMAIL_VERIFICATION_KEY,
        context.getHandler(),
      );

      if (!skip && !user.emailVerifiedAt) {
        throw new ForbiddenException({
          code: 'EMAIL_NOT_VERIFIED',
          message: 'Please verify your email before using this service.',
        });
      }
    }

    return next.handle();
  }
}

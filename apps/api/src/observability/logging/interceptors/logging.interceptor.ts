import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppLogger } from '../interfaces/app-logger.interface';
import { RequestContextService } from '../services/request-context.service';
import { AppLoggerToken } from '../services/logger.factory';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(AppLoggerToken) private readonly logger: AppLogger,
    private readonly contextService: RequestContextService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const now = Date.now();
    const requestId = this.contextService.getRequestId();

    return next.handle().pipe(
      tap({
        next: () => {
          const responseTime = Date.now() - now;
          this.logger.debug('Request completed', {
            requestId,
            method: request.method,
            path: request.originalUrl || request.url || request.path,
            statusCode: response.statusCode,
            responseTime,
          });
        },
        // Removed error branch – exception filter handles all failures
      }),
    );
  }
}

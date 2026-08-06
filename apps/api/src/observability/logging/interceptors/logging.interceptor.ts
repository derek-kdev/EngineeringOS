import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';

import { AppLogger } from '../interfaces/app-logger.interface';
import { RequestContextService } from '../request-context.service';
import { AppLoggerToken } from '../services/logger.factory';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(AppLoggerToken)
    private readonly logger: AppLogger,
    private readonly contextService: RequestContextService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();

    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    const startTime = Date.now();

    const requestId = this.contextService.getRequestId();

    const userAgentHeader = request.headers['user-agent'];

    const userAgent =
      typeof userAgentHeader === 'string' ? userAgentHeader : 'unknown';

    response.on('finish', () => {
      const durationMs = Date.now() - startTime;

      const logPayload = {
        requestId,
        method: request.method,
        path: request.originalUrl,
        statusCode: response.statusCode,
        durationMs,
        ip: request.ip,
        userAgent: userAgent.slice(0, 100),
      };

      if (response.statusCode >= 500) {
        // 5xx errors are already logged with full stack traces
        this.logger.debug('HTTP_SUMMARY (Server Error)', logPayload);
      } else if (response.statusCode >= 400) {
        // 4xx errors
        this.logger.warn('HTTP_SUMMARY (Client Error)', logPayload);
      } else {
        // 2xx / 3xx
        this.logger.info('HTTP_SUMMARY (Completed)', logPayload);
      }
    });

    return next.handle();
  }
}

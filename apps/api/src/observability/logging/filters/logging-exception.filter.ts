import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppLogger } from '../interfaces/app-logger.interface';
import { RequestContextService } from '../services/request-context.service';
import { AppLoggerToken } from '../services/logger.factory';

@Injectable()
@Catch()
export class LoggingExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(AppLoggerToken) private readonly logger: AppLogger,
    private readonly contextService: RequestContextService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    const context = this.contextService.getContext();

    // Log the exception with full context
    this.logger.error(
      'Unhandled exception',
      exception instanceof Error ? exception : undefined,
      {
        ...(context || {}),
        statusCode: status,
        path: request.path,
        method: request.method,
        query: request.query,
        params: request.params,
      },
    );

    // Send sanitised response
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.path,
      message: status >= 500 ? 'Internal server error' : message,
      // Include request ID for tracking
      requestId: context?.requestId || 'unknown',
    });
  }
}

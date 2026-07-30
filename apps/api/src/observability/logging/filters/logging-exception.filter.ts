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

    const message = this.getExceptionMessage(exception);

    const context = this.contextService.getContext();

    const path = request.originalUrl || request.url || request.path;

    const logContext = {
      ...(context ?? {}),
      statusCode: status,
      path,
      method: request.method,
      query: request.query,
      params: request.params,
    };

    const expectedClientErrors = new Set([
      HttpStatus.BAD_REQUEST, // 400
      HttpStatus.UNAUTHORIZED, // 401
      HttpStatus.FORBIDDEN, // 403
      HttpStatus.NOT_FOUND, // 404
      HttpStatus.CONFLICT, // 409
      HttpStatus.UNPROCESSABLE_ENTITY, // 422
      HttpStatus.LOCKED, // 423
    ]);

    if (exception instanceof HttpException) {
      if (status >= 500) {
        // Server-side errors
        this.logger.error(
          'Request exception (server error)',
          exception,
          logContext,
        );
      } else if (!expectedClientErrors.has(status)) {
        // Unexpected client-side HTTP errors
        this.logger.warn('Unexpected client exception', {
          ...logContext,
          message,
        });
      }
      // Expected client errors are intentionally not logged here.
      // They should be logged where they occur (e.g. auth.login.failed).
    } else {
      // Non-HTTP exceptions
      this.logger.error(
        'Unhandled exception',
        exception instanceof Error ? exception : undefined,
        logContext,
      );
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path,
      message: status >= 500 ? 'Internal server error' : message,
      requestId: context?.requestId ?? 'unknown',
    });
  }

  private getExceptionMessage(exception: unknown): string | string[] {
    if (!(exception instanceof HttpException)) {
      return 'Internal server error';
    }

    const response = exception.getResponse();

    if (typeof response === 'string') {
      return response;
    }

    if (
      typeof response === 'object' &&
      response !== null &&
      'message' in response
    ) {
      return (response as { message: string | string[] }).message;
    }

    return exception.message;
  }
}

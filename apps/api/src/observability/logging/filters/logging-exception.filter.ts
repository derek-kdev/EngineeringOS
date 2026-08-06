import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { AppLogger } from '../interfaces/app-logger.interface';
import { LogEvents } from '../constants/logging-events';
import { RequestContextService } from '../request-context.service';
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
    const path = request.originalUrl || request.url || request.path;
    const context = this.contextService.getContext();

    // --- Prisma Error Handling ---
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const errorCode = exception.code;
      let event = LogEvents.DATABASE_ERROR;
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Database operation failed';

      if (errorCode.startsWith('P10')) {
        // Connection / network errors (e.g., P1001: Can't reach database server)
        event = LogEvents.DATABASE_UNAVAILABLE;
        status = HttpStatus.SERVICE_UNAVAILABLE; // 503
        message =
          'Database service is currently unavailable. Please try again later.';
      } else if (errorCode.startsWith('P20')) {
        event = LogEvents.DATABASE_QUERY_FAILED;

        if (errorCode === 'P2002') {
          status = HttpStatus.CONFLICT; // 409

          // Prisma tells us which fields failed in the `meta.target` array
          const failedFields = (exception.meta?.target as string[]) || [];

          if (failedFields.includes('email')) {
            message = 'A user with this email already exists.';
          } else if (failedFields.includes('slug')) {
            message = 'An organization with this slug already exists.';
          } else if (failedFields.includes('organizationId_userId')) {
            message = 'This user is already a member of the organization.';
          } else {
            message = 'A record with this unique property already exists.';
          }
        } else if (errorCode === 'P2025') {
          status = HttpStatus.NOT_FOUND; // 404 (Record not found)
          message =
            'The requested record was not found. Please check your request and try again.';
        } else {
          status = HttpStatus.BAD_REQUEST; // 400
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          message =
            'Invalid database query. Please check your request and try again.';
        }
      } else if (errorCode.startsWith('P30')) {
        // Migration / Schema errors
        event = LogEvents.DATABASE_ERROR;
        status = HttpStatus.INTERNAL_SERVER_ERROR;
      }

      const logContext = {
        statusCode: status,
        path,
        method: request.method,
        prismaCode: errorCode, // Helpful for debugging specific failures in your logs
        prismaMeta: exception.meta, // Additional metadata from Prisma
      };

      //PinoLoggerService automatically adds requestId, userId, organizationId, sessionId, ipAddress, userAgent, correlationId to the log context if available in the RequestContextService
      this.logger.error(event, exception, logContext);

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path,
        message: 'Database operation failed',
        requestId: context?.requestId ?? 'unknown',
      });

      return;
    }

    // 2. Unknown Database Errors (Unexpected database behavior)
    if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      this.logger.error(LogEvents.DATABASE_UNKNOWN_ERROR, exception, {
        statusCode: status,
        path,
        method: request.method,
      });

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path,
        message: 'An unknown database error occurred',
        requestId: context?.requestId ?? 'unknown',
      });

      return;
    }

    // 3. Database Validation Errors (Invalid Prisma syntax/payload)
    if (exception instanceof Prisma.PrismaClientValidationError) {
      const status = HttpStatus.BAD_REQUEST;
      this.logger.error(LogEvents.DATABASE_VALIDATION_ERROR, exception, {
        statusCode: status,
        path,
        method: request.method,
      });

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path,
        message: 'Invalid database query format',
        requestId: context?.requestId ?? 'unknown',
      });

      return;
    }

    // Standard HTTP Exception Handling

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = this.getExceptionMessage(exception);

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

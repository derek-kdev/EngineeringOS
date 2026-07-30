import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { AppLogger } from './interfaces/app-logger.interface';
import { RequestContextService } from './request-context.service';

@Injectable()
export class PinoLoggerService implements AppLogger {
  constructor(
    private readonly pinoLogger: PinoLogger,
    private readonly contextService: RequestContextService,
  ) {}

  private getMeta(meta?: Record<string, unknown>): Record<string, unknown> {
    const context = this.contextService.getContext() || {};
    return { ...context, ...(meta || {}) };
  }

  trace(message: string, meta?: Record<string, unknown>): void {
    this.pinoLogger.trace({ ...this.getMeta(meta) }, message);
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    this.pinoLogger.debug({ ...this.getMeta(meta) }, message);
  }

  info(message: string, meta?: Record<string, unknown>): void {
    this.pinoLogger.info({ ...this.getMeta(meta) }, message);
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    this.pinoLogger.warn({ ...this.getMeta(meta) }, message);
  }

  error(
    message: string,
    error?: unknown,
    meta?: Record<string, unknown>,
  ): void {
    const err = error instanceof Error ? error : undefined;
    const combinedMeta = {
      ...this.getMeta(meta),
      ...(err && {
        error: {
          name: err.name,
          message: err.message,
          stack: err.stack,
        },
      }),
    };
    this.pinoLogger.error(combinedMeta, message);
  }

  fatal(
    message: string,
    error?: unknown,
    meta?: Record<string, unknown>,
  ): void {
    const err = error instanceof Error ? error : undefined;
    const combinedMeta = {
      ...this.getMeta(meta),
      ...(err && {
        error: {
          name: err.name,
          message: err.message,
          stack: err.stack,
        },
      }),
    };
    this.pinoLogger.fatal(combinedMeta, message);
  }
}

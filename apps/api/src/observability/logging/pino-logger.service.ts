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
    return {
      ...(this.contextService.getContext() ?? {}),
      ...(meta ?? {}),
    };
  }

  private log(
    level: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal',
    message: string,
    meta?: Record<string, unknown>,
    error?: unknown,
  ): void {
    this.pinoLogger[level](
      {
        ...this.getMeta(meta),
        ...(error instanceof Error ? { err: error } : {}),
      },
      message,
    );
  }

  trace(message: string, meta?: Record<string, unknown>): void {
    this.log('trace', message, meta);
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    this.log('debug', message, meta);
  }

  info(message: string, meta?: Record<string, unknown>): void {
    this.log('info', message, meta);
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    this.log('warn', message, meta);
  }

  error(
    message: string,
    error?: unknown,
    meta?: Record<string, unknown>,
  ): void {
    this.log('error', message, meta, error);
  }

  fatal(
    message: string,
    error?: unknown,
    meta?: Record<string, unknown>,
  ): void {
    this.log('fatal', message, meta, error);
  }
}

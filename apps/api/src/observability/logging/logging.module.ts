// observability/logging/logging.module.ts
import { Module, Global } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { LoggingExceptionFilter } from './filters/logging-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { RequestContextService } from './request-context.service';
import { PinoLoggerService } from './pino-logger.service';
import { AppLoggerToken } from './services/logger.factory';
import { AppPinoLogger } from './app-pino.logger';

const isProduction = process.env.NODE_ENV === 'production';

@Global()
@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        // 1. Disable default HTTP request logging (handled by LoggingInterceptor)
        autoLogging: false,
        // 2. Set Log Level
        level: process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'),
        // 3.  SECURITY: Redact Sensitive Data (PII, Tokens, Passwords)
        redact: {
          paths: [
            'req.headers.authorization', // Bearer tokens
            'req.headers.cookie', // Session cookies
            'req.body.password', // Login passwords
            'req.body.passwordHash', // DB hashes
            'req.body.refreshToken', // JWTs
            '*.passwordHash', // Prisma query results
            '*.refreshTokenHash',
            '*.token',
            '*.secret',
          ],
          censor: '***REDACTED***',
          remove: false, // Keep the key, but replace value with censor string
        },

        // 4. CLOUD COMPATIBILITY: Standardize JSON schema for Datadog/CloudWatch
        formatters: {
          // Convert Pino's numeric levels (30) to strings ("INFO")
          level: (label) => {
            return { severity: label.toUpperCase() };
          },
          // Clean up default bindings
          bindings: (bindings) => {
            return {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              pid: bindings.pid,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              hostname: bindings.hostname,
              service: process.env.npm_package_name || 'engineering-os-api',
              environment: process.env.NODE_ENV || 'development',
            };
          },
        },

        // Force ISO8601 Timestamps (Required by AWS/GCP/Datadog)
        timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,

        // 5. DEVELOPMENT ONLY: Pretty Print
        // In production, this is undefined, so it outputs raw JSON (which is what you want!)
        transport: isProduction
          ? undefined
          : {
              target: 'pino-pretty',
              options: {
                singleLine: true,
                colorize: true,
                ignore: 'pid,hostname,req,res,service,environment',
                messageFormat: '{msg}',
                translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
              },
            },
      },
    }),
  ],
  providers: [
    RequestContextService,
    AppPinoLogger,
    { provide: APP_FILTER, useClass: LoggingExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    PinoLoggerService,
    { provide: AppLoggerToken, useExisting: PinoLoggerService },
  ],
  exports: [RequestContextService, AppLoggerToken, AppPinoLogger],
})
export class LoggingModule {}

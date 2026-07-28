import { Module, Global, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { buildLoggingConfig } from './logging.config';
import { RequestContextMiddleware } from './middleware/request-context.middleware';
import { RequestContextService } from './services/request-context.service';
import { PinoLoggerService } from './services/pino-logger.service';
import { loggerProvider, AppLoggerToken } from './services/logger.factory';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { LoggingExceptionFilter } from './filters/logging-exception.filter';

@Global()
@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: buildLoggingConfig,
    }),
  ],
  providers: [
    RequestContextService,
    PinoLoggerService,
    loggerProvider,
    LoggingInterceptor,
    LoggingExceptionFilter,
  ],
  exports: [AppLoggerToken, RequestContextService],
})
export class LoggingModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}

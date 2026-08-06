// observability/logging/logger.module.ts
import { Module, Global } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { PinoLoggerService } from './pino-logger.service';
import { AppLoggerToken } from './services/logger.factory';

@Global() // Makes the AppLoggerToken available to the entire application
@Module({
  imports: [
    // Internal Pino configuration (hidden from the rest of the app)
    PinoLoggerModule.forRoot({
      pinoHttp: {
        autoLogging: false, // We handle request logging via our own Interceptor
        // ... other pino configs
      },
    }),
  ],
  providers: [
    PinoLoggerService,
    {
      // Map the generic Token to the concrete Pino implementation
      provide: AppLoggerToken,
      useExisting: PinoLoggerService,
    },
  ],
  exports: [AppLoggerToken], // Export ONLY the token, never the concrete class
})
export class LoggerModule {}

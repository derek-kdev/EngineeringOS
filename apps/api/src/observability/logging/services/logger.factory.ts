import { FactoryProvider } from '@nestjs/common';
import { PinoLoggerService } from '../pino-logger.service';
import { AppLogger } from '../interfaces/app-logger.interface';

export const AppLoggerToken = 'AppLogger';

export const loggerProvider: FactoryProvider<AppLogger> = {
  provide: AppLoggerToken,
  useFactory: (pinoLoggerService: PinoLoggerService) => pinoLoggerService,
  inject: [PinoLoggerService],
};

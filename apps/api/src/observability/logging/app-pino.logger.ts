// observability/logging/app-pino.logger.ts
// For surpressing logs from NestJS internals (InstanceLoader, RouterExplorer, RoutesResolver, NestFactory, NestApplication)
import { Logger } from 'nestjs-pino';

export class AppPinoLogger extends Logger {
  private readonly ignoredContexts = [
    'InstanceLoader',
    'RouterExplorer',
    'RoutesResolver',
    'NestFactory',
    'NestApplication',
    'LegacyRouteConverter', // Hides the /api/* path-to-regexp warning
  ];

  log(message: any, context?: string) {
    if (context && this.ignoredContexts.includes(context)) return;
    super.log(message, context);
  }

  warn(message: any, context?: string) {
    if (context && this.ignoredContexts.includes(context)) return;
    super.warn(message, context);
  }

  error(message: any, trace?: string, context?: string) {
    if (context && this.ignoredContexts.includes(context)) return;
    super.error(message, trace, context);
  }
}

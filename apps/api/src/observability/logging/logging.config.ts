import { ConfigService } from '@nestjs/config';
import { Params } from 'nestjs-pino';

export const buildLoggingConfig = (configService: ConfigService): Params => {
  const isProduction = configService.get('NODE_ENV') === 'production';
  const appName = configService.get('APP_NAME') || 'EngineeringOS';

  const pinoHttpConfig = {
    name: appName,
    level: isProduction ? 'info' : 'debug',
    formatters: {
      level: (label: string) => ({ level: label }),
    },
    redact: {
      paths: [
        'req.headers.authorization',
        'req.headers.cookie',
        'req.body.password',
        'req.body.passwordHash',
        'req.body.currentPassword',
        'req.body.newPassword',
        'req.body.token',
        'req.body.refreshToken',
        'req.body.accessToken',
        'req.body.apiKey',
        'req.body.secret',
        'res.headers["set-cookie"]',
      ],
      censor: '***REDACTED***',
    },
    serializers: {
      req: (req: any) => ({
        id: req.id,
        method: req.method,

        // Keep both for debugging/proxy troubleshooting
        url: req.url,
        path: req.originalUrl || req.url || req.path,

        query: req.query,
        params: req.params,

        headers: {
          'user-agent': req.headers['user-agent'],
          'x-request-id': req.headers['x-request-id'],
        },

        remoteAddress: req.remoteAddress,
        remotePort: req.remotePort,
      }),

      res: (res: any) => ({
        statusCode: res.statusCode,
        headers: {
          'content-length': res.headers['content-length'],
        },
      }),
    },
    timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
  };

  if (isProduction) {
    // Production: JSON output without pretty printing
    return {
      pinoHttp: {
        ...pinoHttpConfig,
        transport: undefined, // no pretty
        autoLogging: {
          ignore: (req) => req.url === '/health' || req.url === '/api/docs',
        },
      },
    };
  } else {
    // Development: pretty print
    return {
      pinoHttp: {
        ...pinoHttpConfig,
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
            levelFirst: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
        autoLogging: false,
      },
    };
  }
};

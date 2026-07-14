import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import compression from 'compression';
import { json, urlencoded } from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn', 'log']
        : ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  /* Security */

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
          fontSrc: ["'self'", 'data:'],
        },
      },
    }),
  );

  const corsOrigin =
    process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()) || [];

  if (process.env.NODE_ENV === 'production' && corsOrigin.length === 0) {
    throw new Error('CORS_ORIGIN must be configured in production');
  }

  app.enableCors({
    origin: corsOrigin.length > 0 ? corsOrigin : ['http://localhost:3000'],

    credentials: true,

    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],

    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Request-ID'],

    maxAge: 86400,
  });

  /* Performance */

  app.use(compression());

  /* Request Body Limits
  | Large files should use object storage.
  | These limits protect the API layer.
  */

  app.use(
    json({
      limit: '10mb',
    }),
  );

  app.use(
    urlencoded({
      extended: true,
      limit: '10mb',
    }),
  );

  /* API Configuration */
  app.setGlobalPrefix('api', {
    exclude: ['health'],
  });
 

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  /* Swagger Setup */
  const config = new DocumentBuilder()
    .setTitle('EngineeringOS API')
    .setDescription('API documentation for EngineeringOS')
    .setVersion('1.0')
    .addBearerAuth() // optional, if you use JWT
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // accessible at /api/docs

  /* Validation */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,

      forbidNonWhitelisted: true,

      transform: true,

      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  /* Graceful Shutdown */
  app.enableShutdownHooks();

  /* Server Start  */
  const port = process.env.PORT ?? 3001;

  await app.listen(port, '0.0.0.0');

  logger.log(`EngineeringOS API running on http://0.0.0.0:${port}/api`);
}

/* Process Error Handling */

const processLogger = new Logger('Process');

process.on('uncaughtException', (error) => {
  processLogger.error('Uncaught Exception', error.stack);
});

process.on('unhandledRejection', (reason) => {
  processLogger.error('Unhandled Promise Rejection', String(reason));
});

bootstrap().catch((err) => {
  logger.error('Failed to start application', err);
  process.exit(1);
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
//import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import compression from 'compression';
import { json, urlencoded } from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppPinoLogger } from './observability/logging/app-pino.logger';

async function bootstrap() {
  //bufferLogs: true prevents the default ConsoleLogger from logging startup logs
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(AppPinoLogger));
  const logger = app.get(AppPinoLogger);

  /* Security, CORS, Compression */
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

  /* Request Body Limits */
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  /* API Configuration */
  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  /* Swagger Setup */
  const config = new DocumentBuilder()
    .setTitle('EngineeringOS API')
    .setDescription('API documentation for EngineeringOS')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

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

  /* Server Start */
  const port = process.env.PORT ?? 3001;
  await app.listen(port, '0.0.0.0');
  logger.log(
    `EngineeringOS API running on http://0.0.0.0:${port}/api/v1`,
    'Bootstrap',
  );
}

/* Global Process Error Handling (Safety net for background tasks like setImmediate) */
bootstrap().catch((err) => {
  console.error('Failed to start application', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  console.error('Unhandled Promise Rejection (Background Task):', reason);
  // In production, you might want to trigger a graceful shutdown or alert here
});

process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception (Background Task):', error);
  process.exit(1); // Fatal error, let Docker/K8s restart the container
});

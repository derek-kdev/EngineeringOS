/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Inject,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { AppLogger, LogEvents, AppLoggerToken } from '@/observability/logging';
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    @Inject(AppLoggerToken)
    private readonly logger: AppLogger,
  ) {
    //Postgres connection pool configuration
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10, // Maximum number of connections in the pool
      idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
      connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
    });

    const adapter = new PrismaPg(pool);

    super({
      adapter,
    });
  }

  async onModuleInit(): Promise<void> {
    this.logger.info(LogEvents.DATABASE_CONNECTING);
    try {
      await this.$connect();
      await this.$queryRaw`SELECT 1`;
      this.logger.info(LogEvents.DATABASE_CONNECTED);
    } catch (error) {
      this.logger.error(LogEvents.DATABASE_CONNECTION_FAILED, error, {
        database: 'postgres',
      });
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    this.logger.info(LogEvents.DATABASE_DISCONNECTED);
  }
}

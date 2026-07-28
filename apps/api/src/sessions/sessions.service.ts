import { Injectable, Inject } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { Session } from '@prisma/client';

import { AppLogger, AppLoggerToken, LogEvents } from '../observability/logging';

@Injectable()
export class SessionsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(AppLoggerToken)
    private readonly logger: AppLogger,
  ) {}

  /**
   * Creates a new session for a user.
   */
  async createSession(
    userId: string,
    ipAddress?: string,
    userAgent?: string,
    expiresInSeconds: number = 7 * 24 * 60 * 60,
  ): Promise<Session> {
    try {
      const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);

      const session = await this.prisma.session.create({
        data: {
          userId,
          ipAddress: ipAddress?.slice(0, 45),
          userAgent: userAgent?.slice(0, 255),
          expiresAt,
        },
      });

      this.logger.info(LogEvents.SESSION_CREATED, {
        sessionId: session.id,
        userId,
        expiresAt,
      });

      return session;
    } catch (error) {
      this.logger.error(LogEvents.SESSION_CREATED + '.failed', error, {
        userId,
      });

      throw error;
    }
  }

  /**
   * Revokes a specific session.
   */
  async revokeSession(sessionId: string): Promise<void> {
    try {
      await this.prisma.session.update({
        where: {
          id: sessionId,
        },
        data: {
          revokedAt: new Date(),
        },
      });

      this.logger.info(LogEvents.SESSION_REVOKED, {
        sessionId,
      });
    } catch (error) {
      this.logger.error(LogEvents.SESSION_REVOKED + '.failed', error, {
        sessionId,
      });

      throw error;
    }
  }

  /**
   * Revokes all active sessions for a user.
   */
  async revokeAllSessions(userId: string): Promise<void> {
    try {
      const result = await this.prisma.session.updateMany({
        where: {
          userId,
          revokedAt: null,
        },
        data: {
          revokedAt: new Date(),
        },
      });

      this.logger.info(LogEvents.SESSION_REVOKED_ALL, {
        userId,
        revokedCount: result.count,
      });
    } catch (error) {
      this.logger.error(LogEvents.SESSION_REVOKED_ALL + '.failed', error, {
        userId,
      });

      throw error;
    }
  }

  /**
   * Cleans expired sessions.
   */
  async cleanExpiredSessions(): Promise<number> {
    try {
      const result = await this.prisma.session.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      this.logger.debug(LogEvents.SESSION_CLEANUP, {
        deletedCount: result.count,
      });

      return result.count;
    } catch (error) {
      this.logger.error(LogEvents.SESSION_CLEANUP + '.failed', error);

      throw error;
    }
  }
}

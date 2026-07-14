import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Session } from '@prisma/client';

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new session for a user.
   * @param userId - ID of the authenticated user
   * @param ipAddress - client IP (optional)
   * @param userAgent - client user-agent (optional)
   * @param expiresInSeconds - session lifetime (default 7 days, same as refresh token)
   */
  async createSession(
    userId: string,
    ipAddress?: string,
    userAgent?: string,
    expiresInSeconds: number = 7 * 24 * 60 * 60,
  ): Promise<Session> {
    const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);
    return this.prisma.session.create({
      data: {
        userId,
        ipAddress: ipAddress?.slice(0, 45), // IPv6 max length
        userAgent: userAgent?.slice(0, 255),
        expiresAt,
      },
    });
  }

  /**
   * Revokes a specific session.
   */
  async revokeSession(sessionId: string): Promise<void> {
    await this.prisma.session.update({
      where: { id: sessionId },
      data: { revokedAt: new Date() },
    });
  }

  /**
   * Revokes all active sessions for a user.
   */
  async revokeAllSessions(userId: string): Promise<void> {
    await this.prisma.session.updateMany({
      where: {
        userId,
        revokedAt: null,
      },
      data: { revokedAt: new Date() },
    });
  }

  /**
   * Optionally cleans expired sessions (can be called by a scheduled job).
   */
  async cleanExpiredSessions(): Promise<number> {
    const result = await this.prisma.session.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    });
    return result.count;
  }
}

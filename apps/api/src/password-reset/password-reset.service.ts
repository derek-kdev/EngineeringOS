import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { PasswordService } from '../common/security/password.service';
import { ConfigService } from '@nestjs/config';
import { randomBytes, createHash } from 'crypto';

import { AppLogger, AppLoggerToken, LogEvents } from '../observability/logging';

@Injectable()
export class PasswordResetService {
  private readonly webUrl: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    @Inject(AppLoggerToken)
    private readonly logger: AppLogger,
  ) {
    this.webUrl =
      this.configService.get<string>('WEB_URL') || 'http://localhost:3000';
  }

  private generateToken(): string {
    return randomBytes(32).toString('hex');
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  async requestPasswordReset(email: string): Promise<void> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
        },
      });

      // Do not reveal whether an account exists
      if (!user) {
        // Do not leak existence, but log debug
        this.logger.debug(
          LogEvents.PASSWORD_RESET_REQUESTED + '.user_not_found',
          { email },
        );
        return;
      }

      // Remove previous unused reset tokens
      await this.prisma.passwordResetToken.deleteMany({
        where: {
          userId: user.id,
          usedAt: null,
        },
      });

      const token = this.generateToken();

      const tokenHash = this.hashToken(token);

      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

      await this.prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          tokenHash,
          expiresAt,
        },
      });

      const resetUrl = `${this.webUrl}/reset-password?token=${token}`;

      await this.mailService.sendPasswordResetEmail(email, resetUrl);

      this.logger.info(LogEvents.PASSWORD_RESET_REQUESTED, {
        userId: user.id,
      });
    } catch (error) {
      this.logger.error(LogEvents.PASSWORD_RESET_REQUESTED + '.failed', error, {
        operation: 'requestPasswordReset',
      });

      throw error;
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<string> {
    try {
      const tokenHash = this.hashToken(token);

      const record = await this.prisma.passwordResetToken.findFirst({
        where: {
          tokenHash,
          usedAt: null,
          expiresAt: {
            gt: new Date(),
          },
        },
      });

      if (!record) {
        this.logger.warn(
          LogEvents.PASSWORD_RESET_COMPLETED + '.invalid_token',
          {
            tokenProvided: !!token,
          },
        );

        throw new BadRequestException('Invalid or expired reset token');
      }

      const newPasswordHash = await this.passwordService.hash(newPassword);

      await this.prisma.$transaction([
        this.prisma.user.update({
          where: {
            id: record.userId,
          },
          data: {
            passwordHash: newPasswordHash,
          },
        }),

        this.prisma.passwordResetToken.update({
          where: {
            id: record.id,
          },
          data: {
            usedAt: new Date(),
          },
        }),

        this.prisma.refreshToken.updateMany({
          where: {
            userId: record.userId,
            revokedAt: null,
          },
          data: {
            revokedAt: new Date(),
          },
        }),
      ]);

      this.logger.info(LogEvents.PASSWORD_RESET_COMPLETED, {
        userId: record.userId,
      });

      return record.userId;
    } catch (error) {
      this.logger.error(LogEvents.PASSWORD_RESET_COMPLETED + '.failed', error, {
        operation: 'resetPassword',
      });

      throw error;
    }
  }
}

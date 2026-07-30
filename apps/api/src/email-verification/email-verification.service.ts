import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import {
  AppLogger,
  AppLoggerToken,
  LogEvents,
  RequestContextService,
} from '../observability/logging';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { randomBytes, createHash } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { IEventPublisher } from '../events/interfaces/event-publisher.interface';
import { EVENT_PUBLISHER } from '../events/constants/tokens.constants';
import { EmailVerifiedEvent } from './events/email-verified.event';
@Injectable()
export class EmailVerificationService {
  private readonly webUrl: string;

  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    private configService: ConfigService,
    @Inject(AppLoggerToken)
    private readonly logger: AppLogger,
    @Inject(EVENT_PUBLISHER) private readonly eventPublisher: IEventPublisher,
    private readonly requestContextService: RequestContextService,
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

  async createAndSendVerificationEmail(userId: string): Promise<void> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          email: true,
          emailVerifiedAt: true,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (user.emailVerifiedAt) {
        throw new BadRequestException('Email already verified');
      }

      await this.prisma.emailVerificationToken.deleteMany({
        where: {
          userId,
          usedAt: null,
        },
      });

      const token = this.generateToken();
      const tokenHash = this.hashToken(token);

      const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

      await this.prisma.emailVerificationToken.create({
        data: {
          userId,
          tokenHash,
          expiresAt,
        },
      });

      const verificationUrl = `${this.webUrl}/verify-email?token=${token}`;

      await this.mailService.sendEmailVerificationEmail(
        user.email,
        verificationUrl,
      );

      this.logger.info(LogEvents.EMAIL_VERIFICATION_SENT, {
        userId,
      });
    } catch (error) {
      this.logger.error(LogEvents.EMAIL_VERIFICATION_SENT + '.failed', error, {
        userId,
      });

      throw error;
    }
  }

  async verifyEmailToken(token: string): Promise<void> {
    try {
      const tokenHash = this.hashToken(token);

      const record = await this.prisma.emailVerificationToken.findFirst({
        where: {
          tokenHash,
          usedAt: null,
          expiresAt: {
            gt: new Date(),
          },
        },
        include: {
          user: true,
        },
      });

      if (!record) {
        throw new BadRequestException('Invalid or expired verification token');
      }

      if (record.user.emailVerifiedAt) {
        throw new BadRequestException('Email already verified');
      }

      await this.prisma.$transaction([
        this.prisma.user.update({
          where: {
            id: record.userId,
          },
          data: {
            emailVerifiedAt: new Date(),
          },
        }),

        this.prisma.emailVerificationToken.update({
          where: {
            id: record.id,
          },
          data: {
            usedAt: new Date(),
          },
        }),
      ]);

      await this.eventPublisher.publish(
        new EmailVerifiedEvent({
          payload: {
            userId: record.userId,
            email: record.user.email,
          },
          userId: record.userId,
          metadata: {
            requestId: this.requestContextService.get('requestId'),
            source: 'email-verification.verify',
          },
        }),
      );

      this.logger.info(LogEvents.AUTH_EMAIL_VERIFICATION_SUCCESS, {
        userId: record.userId,
      });
    } catch (error) {
      this.logger.error(
        LogEvents.AUTH_EMAIL_VERIFICATION_SUCCESS + '.failed',
        error,
      );

      throw error;
    }
  }

  async resendVerificationEmail(email: string): Promise<void> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          emailVerifiedAt: true,
        },
      });

      // Silent success to prevent account enumeration
      if (!user || user.emailVerifiedAt) {
        return;
      }

      await this.createAndSendVerificationEmail(user.id);

      this.logger.info(LogEvents.EMAIL_VERIFICATION_RESENT, {
        userId: user.id,
      });
    } catch (error) {
      this.logger.error(LogEvents.EMAIL_VERIFICATION_RESENT + '.failed', error);

      throw error;
    }
  }
}

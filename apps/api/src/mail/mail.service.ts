// src/mail/mail.service.ts

import { Injectable, Inject } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { AppLogger, AppLoggerToken, LogEvents } from '../observability/logging';

import { emailVerificationTemplate } from './templates/email-verification.template';
import { passwordResetTemplate } from './templates/password-reset.template';

@Injectable()
export class MailService {
  private appName: string;

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    @Inject(AppLoggerToken)
    private readonly logger: AppLogger,
  ) {
    this.appName =
      this.configService.get<string>('APP_NAME') || 'Engineering OS';
  }

  /**
   * Core sendMail function accepting a raw HTML string
   */
  async sendMail(to: string, subject: string, html: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        html,
      });

      this.logger.info(LogEvents.EMAIL_SENT, {
        recipient: to,
        subject,
      });
    } catch (error) {
      this.logger.error(LogEvents.EMAIL_FAILED, error, {
        recipient: to,
        subject,
      });

      throw error;
    }
  }

  async sendEmailVerificationEmail(
    email: string,
    verificationUrl: string,
  ): Promise<void> {
    const subject = `Verify your email for ${this.appName}`;

    const html = emailVerificationTemplate({
      appName: this.appName,
      verificationUrl,
      expiryMinutes: 30,
    });

    await this.sendMail(email, subject, html);
  }

  async sendPasswordResetEmail(email: string, resetUrl: string): Promise<void> {
    const subject = `Reset your password for ${this.appName}`;

    const html = passwordResetTemplate({
      appName: this.appName,
      resetUrl,
      expiryMinutes: 15,
    });

    await this.sendMail(email, subject, html);
  }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { emailVerificationTemplate } from './templates/email-verification.template';
import { passwordResetTemplate } from './templates/password-reset.template';

@Injectable()
export class MailService implements OnModuleInit {
  private appName: string;
  private baseUrl: string;
  private logoDataUri!: string; // definite assignment in onModuleInit

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
    this.appName = this.configService.get<string>('APP_NAME') || 'EngineeringOS';
    this.baseUrl = this.configService.get<string>('APP_URL') || 'https://engineeringos.com';
  }

  async onModuleInit() {
    // The compiled dist is at dist/src/mail/mail.service.js
    // __dirname = .../dist/src/mail
    // Go up 3 levels to reach the project root, then into src/mail/assets
    const logoPath = path.join(
      __dirname,      // dist/src/mail
      '..', '..', '..', // up to project root (apps/api)
      'src', 'mail', 'assets', 'our_logo.jpg',
    );
    const imageBuffer = fs.readFileSync(logoPath);
    const base64 = imageBuffer.toString('base64');
    this.logoDataUri = `data:image/jpeg;base64,${base64}`;
  }

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    await this.mailerService.sendMail({ to, subject, html });
  }

  async sendEmailVerificationEmail(email: string, verificationUrl: string): Promise<void> {
    const subject = `Verify your email for ${this.appName}`;
    const html = emailVerificationTemplate({
      appName: this.appName,
      verificationUrl,
      expiryMinutes: 30,
      baseUrl: this.baseUrl,
      logoDataUri: this.logoDataUri,
    });
    await this.sendMail(email, subject, html);
  }

  async sendPasswordResetEmail(email: string, resetUrl: string): Promise<void> {
    const subject = `Reset your password for ${this.appName}`;
    const html = passwordResetTemplate({
      appName: this.appName,
      resetUrl,
      expiryMinutes: 15,
      baseUrl: this.baseUrl,
      logoDataUri: this.logoDataUri,
    });
    await this.sendMail(email, subject, html);
  }
}

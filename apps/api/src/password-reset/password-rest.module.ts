// src/password-reset/password-reset.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MailModule } from '../mail/mail.module';
import { PasswordResetService } from './password-reset.service';
import { PasswordService } from '../common/security/password.service';

@Module({
  imports: [PrismaModule, MailModule],
  providers: [PasswordResetService, PasswordService],
  exports: [PasswordResetService],
})
export class PasswordResetModule {}

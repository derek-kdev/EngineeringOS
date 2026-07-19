/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import { PasswordService } from '../common/security/password.service';
import { PrismaService } from '../prisma/prisma.service';
import { SessionsService } from '../sessions/sessions.service';
import { EmailVerificationService } from '../email-verification/email-verification.service';
import { PasswordResetService } from '../password-reset/password-reset.service';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto';
import { AuthTokens } from './interfaces/auth-tokens.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly sessionsService: SessionsService,
    private readonly emailVerificationService: EmailVerificationService,
    private readonly passwordResetService: PasswordResetService,
  ) {}

  // ─── Registration ────────────────────────────────────────────────────

  async register(
    dto: RegisterDto,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<{ user: any; tokens: AuthTokens }> {
    const passwordHash = await this.passwordService.hash(dto.password);

    // Map organization input
    const orgInput = dto.organization?.create
      ? {
          create: true,
          name: dto.organization.name!,
          slug: dto.organization.slug!,
        }
      : undefined;

    // ─── MODIFIED: Wrap entire registration in a transaction ──────────────
    const { user, tokens } = await this.prisma.$transaction(async (tx) => {
      const user = await this.usersService.create(
        {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          passwordHash,
          organization: orgInput,
        },
        tx,
      );

      // 2. Generate JWT tokens (can be inside or outside transaction)
      const tokens = await this.generateTokens({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      // 3. Store refresh token
      const refreshTokenHash = this.hashToken(tokens.refreshToken);
      const refreshExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await tx.refreshToken.create({
        data: {
          userId: user.id,
          tokenHash: refreshTokenHash,
          expiresAt: refreshExpiry,
        },
      });

      // 4. Create a session record
      const sessionExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await tx.session.create({
        data: {
          userId: user.id,
          ipAddress: ipAddress?.slice(0, 45),
          userAgent: userAgent?.slice(0, 255),
          expiresAt: sessionExpiry,
        },
      });

      return { user, tokens };
    });

    // Send verification email if configured
    const globalSendEmail =
      process.env.SEND_VERIFICATION_EMAIL_ON_REGISTER !== 'false';
    const shouldSend =
      dto.sendVerificationEmail !== undefined
        ? dto.sendVerificationEmail
        : globalSendEmail;

    if (shouldSend) {
      setImmediate(() => {
        this.emailVerificationService
          .createAndSendVerificationEmail(user.id)
          .catch((err) => {
            // Log error but don't fail registration
            console.error('Failed to send verification email:', err);
          });
      });
    }

    return { user, tokens };
  }

  // ─── Login ──────────────────────────────────────────────────────────

  async login(
    dto: LoginDto,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<{ user: any; tokens: AuthTokens }> {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Everything in one transaction
    const tokens = await this.prisma.$transaction(async (tx) => {
      // 1. Generate tokens
      const tokens = await this.generateTokens({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      // 2. Store refresh token
      const refreshTokenHash = this.hashToken(tokens.refreshToken);
      const refreshExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await tx.refreshToken.create({
        data: {
          userId: user.id,
          tokenHash: refreshTokenHash,
          expiresAt: refreshExpiry,
        },
      });

      // 3. Update last login timestamp
      await tx.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });

      // 4. Create a session record
      const sessionExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await tx.session.create({
        data: {
          userId: user.id,
          ipAddress: ipAddress?.slice(0, 45),
          userAgent: userAgent?.slice(0, 255),
          expiresAt: sessionExpiry,
        },
      });

      return tokens;
    });

    return { user, tokens };
  }

  // ─── Refresh Token ──────────────────────────────────────────────────

  async refresh(dto: RefreshTokenDto): Promise<AuthTokens> {
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(dto.refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersService.findByIdWithSensitive(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Find the refresh token record by its hash
    const tokenHash = this.hashToken(dto.refreshToken);
    const storedToken = await this.prisma.refreshToken.findFirst({
      where: {
        tokenHash,
        userId: user.id,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
    });
    if (!storedToken) {
      throw new UnauthorizedException('Refresh token not found or expired');
    }

    // Revoke the old refresh token (optional, we can also delete)
    await this.prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revokedAt: new Date() },
    });

    // Generate new tokens
    const tokens = await this.generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const newRefreshTokenHash = this.hashToken(tokens.refreshToken);
    const refreshExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await this.usersService.createRefreshToken(
      user.id,
      newRefreshTokenHash,
      refreshExpiry,
    );

    return tokens;
  }

  // ─── Logout ─────────────────────────────────────────────────────────

  async logout(userId: string): Promise<void> {
    // Revoke all refresh tokens for the user (or the current one if we have it)
    await this.prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });

    //Revoke all active sessions for the user
    await this.sessionsService.revokeAllSessions(userId);
  }

  // ─── Forgot Password ───────────────────────────────────────────────

  async forgotPassword(email: string): Promise<void> {
    await this.passwordResetService.requestPasswordReset(email);
  }

  // ─── Reset Password ────────────────────────────────────────────────

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await this.passwordResetService.resetPassword(token, newPassword);
  }

  // ─── Change Password ────────────────────────────────────────────

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.usersService.findByIdWithSensitive(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await this.passwordService.compare(
      currentPassword,
      user.passwordHash,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Current password is incorrect');
    }
    const newPasswordHash = await this.passwordService.hash(newPassword);
    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newPasswordHash },
    });
    await this.prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    await this.sessionsService.revokeAllSessions(userId);
  }

  // ─── Email Verification ────────────────────────────────────────────

  async verifyEmail(token: string): Promise<void> {
    await this.emailVerificationService.verifyEmailToken(token);
  }

  async resendVerification(email: string): Promise<void> {
    await this.emailVerificationService.resendVerificationEmail(email);
  }

  // ─── Internal Helpers ──────────────────────────────────────────────

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const isMatch = await this.passwordService.compare(
      password,
      user.passwordHash,
    );
    if (!isMatch) return null;

    return this.usersService.findById(user.id);
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private async generateTokens(user: {
    id: string;
    email: string;
    role: string;
  }): Promise<AuthTokens> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: (process.env.JWT_EXPIRES_IN || '15m') as any,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any,
      }),
    ]);
    return { accessToken, refreshToken };
  }
}

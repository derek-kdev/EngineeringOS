/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { UsersService } from '../users/user.service';
import { PasswordService } from '../common/security/password.service';
import { PrismaService } from '../prisma/prisma.service';
import { SessionsService } from '../sessions/sessions.service';
import {
  LoginDto,
  RegisterDto,
  RefreshTokenDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyEmailDto,
} from './dto';
import { AuthTokens } from './interfaces/auth-tokens.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly sessionsService: SessionsService,
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
    const { user, tokens, verificationToken } = await this.prisma.$transaction(
      async (tx) => {
        // 1. Create user (pass transaction client)
        const user = await this.usersService.create(
          {
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            passwordHash,
            organization: orgInput,
          },
          tx, // pass transaction
        );

        // 2. Generate and store verification token
        const verificationToken = this.generateSecureToken();
        const tokenHash = await this.passwordService.hash(verificationToken);
        const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        await this.usersService.createVerificationToken(
          user.id,
          tokenHash,
          expiry,
          tx, // pass transaction
        );

        // 3. Generate JWT tokens (can be inside or outside transaction)
        const tokens = await this.generateTokens({
          id: user.id,
          email: user.email,
          role: user.role,
        });

        // 4. Store refresh token (using transaction)
        const refreshTokenHash = await this.passwordService.hash(
          tokens.refreshToken,
        );
        const refreshExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await this.usersService.createRefreshToken(
          user.id,
          refreshTokenHash,
          refreshExpiry,
          tx, // pass transaction
        );

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

        return { user, tokens, verificationToken };
      },
    );

    // ─── MODIFIED: Conditionally send verification email after commit ─────
    // Determine if we should send the email:
    // 1. Use DTO override if provided, else fallback to env var (default true)
    const globalSendEmail =
      process.env.SEND_VERIFICATION_EMAIL_ON_REGISTER !== 'false';
    const shouldSend =
      dto.sendVerificationEmail !== undefined
        ? dto.sendVerificationEmail
        : globalSendEmail;

    if (shouldSend) {
      // Use setImmediate to send email asynchronously without blocking response
      setImmediate(() => {
        this.sendVerificationEmail(user.email, verificationToken);
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
      const refreshTokenHash = await this.passwordService.hash(
        tokens.refreshToken,
      );
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
    const tokenHash = await this.passwordService.hash(dto.refreshToken);
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
    const newRefreshTokenHash = await this.passwordService.hash(
      tokens.refreshToken,
    );
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

  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      // For security, email is not revealed if it exists.
      return;
    }

    const resetToken = this.generateSecureToken();
    const tokenHash = await this.passwordService.hash(resetToken);
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await this.usersService.createPasswordResetToken(
      user.id,
      tokenHash,
      expiry,
    );

    this.sendPasswordResetEmail(user.email, resetToken);
  }

  // ─── Reset Password ────────────────────────────────────────────────

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    const tokenHash = await this.passwordService.hash(dto.token);
    const resetTokenRecord = await this.prisma.passwordResetToken.findFirst({
      where: {
        tokenHash,
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });
    if (!resetTokenRecord) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const newPasswordHash = await this.passwordService.hash(dto.password);
    await this.usersService.updatePassword(
      resetTokenRecord.userId,
      newPasswordHash,
    );

    // Mark token as used
    await this.prisma.passwordResetToken.update({
      where: { id: resetTokenRecord.id },
      data: { usedAt: new Date() },
    });

    // Optionally revoke all refresh tokens for this user
    await this.prisma.refreshToken.updateMany({
      where: { userId: resetTokenRecord.userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  // ─── Email Verification ────────────────────────────────────────────

  async verifyEmailToken(token: string): Promise<void> {
    const tokenHash = await this.passwordService.hash(token);
    const verificationRecord =
      await this.prisma.emailVerificationToken.findFirst({
        where: {
          tokenHash,
          usedAt: null,
          expiresAt: { gt: new Date() },
        },
      });
    if (!verificationRecord) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    await this.usersService.markEmailVerified(verificationRecord.userId);
    // Mark token as used
    await this.prisma.emailVerificationToken.update({
      where: { id: verificationRecord.id },
      data: { usedAt: new Date() },
    });
  }

  async verifyEmail(dto: VerifyEmailDto): Promise<void> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.emailVerifiedAt) {
      throw new BadRequestException('Email already verified');
    }

    const verificationToken = this.generateSecureToken();
    const tokenHash = await this.passwordService.hash(verificationToken);
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await this.usersService.createVerificationToken(user.id, tokenHash, expiry);

    this.sendVerificationEmail(user.email, verificationToken);
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

  private generateSecureToken(): string {
    return randomBytes(32).toString('hex');
  }

  // ─── Email Sending Placeholders ──────────────────────────────────

  private sendVerificationEmail(email: string, token: string): void {
    console.log(`Sending verification email to ${email} with token: ${token}`);
  }

  private sendPasswordResetEmail(email: string, token: string): void {
    console.log(
      `Sending password reset email to ${email} with token: ${token}`,
    );
  }
}

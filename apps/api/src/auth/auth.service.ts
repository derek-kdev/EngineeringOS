/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  HttpStatus,
  HttpException,
  Inject,
} from '@nestjs/common';
import { IEventPublisher } from '../events/interfaces/event-publisher.interface';
import { EVENT_PUBLISHER } from '../events/constants/tokens.constants';
import { UserRegisteredEvent } from './events/user-registered.event';
import { UserLoggedInEvent } from './events/user-logged-in.event';
import { UserLoggedOutEvent } from './events/user-logged-out.event';
import { PasswordChangedEvent } from './events/password-changed.event';
import {
  AppLogger,
  LogEvents,
  RequestContextService,
} from '../observability/logging';
import { AppLoggerToken } from '../observability/logging';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import { PasswordService } from '../common/security/password.service';
import { PrismaService } from '../prisma/prisma.service';
import { SessionsService } from '../sessions/sessions.service';
import { EmailVerificationService } from '../email-verification/email-verification.service';
import { PasswordResetService } from '../password-reset/password-reset.service';
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto';
import { AuthTokens } from './interfaces/auth-tokens.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { createHash } from 'crypto';
import { OrganizationService } from '../organizations/organization.service';
import { CreateOrganizationDto } from '../organizations/dto';

@Injectable()
export class AuthService {
  //requestContextService: any;
  constructor(
    @Inject(AppLoggerToken) private readonly logger: AppLogger,
    @Inject(EVENT_PUBLISHER) private readonly eventPublisher: IEventPublisher,
    private readonly requestContextService: RequestContextService,
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly sessionsService: SessionsService,
    private readonly emailVerificationService: EmailVerificationService,
    private readonly passwordResetService: PasswordResetService,
    private readonly organizationService: OrganizationService,
  ) {}

  // ─── Registration ──────────────────────────────────────────────────────

  async register(
    dto: RegisterDto,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<{ user: any; tokens: AuthTokens }> {
    const passwordHash = await this.passwordService.hash(dto.password);

    const { user, tokens, organizationId } = await this.prisma.$transaction(
      async (tx) => {
        // 1. Create user (no organization)
        const user = await this.usersService.create(
          {
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            passwordHash,
          },
          tx,
        );

        let organizationId: string | undefined;

        // 2. Optionally create organization
        if (dto.organization?.create) {
          const orgDto: CreateOrganizationDto = {
            name: dto.organization.name!,
            slug: dto.organization.slug,
          };

          const organization =
            await this.organizationService.createOrganization(
              user.id,
              orgDto,
              tx,
            );

          organizationId = organization.id;
        }

        // 3. Generate JWT tokens
        const tokens = await this.generateTokens({
          id: user.id,
          email: user.email,
          role: user.role,
        });

        // 4. Store refresh token
        const refreshTokenHash = this.hashToken(tokens.refreshToken);
        const refreshExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await tx.refreshToken.create({
          data: {
            userId: user.id,
            tokenHash: refreshTokenHash,
            expiresAt: refreshExpiry,
          },
        });

        // 5. Create session
        const sessionExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await tx.session.create({
          data: {
            userId: user.id,
            ipAddress: ipAddress?.slice(0, 45),
            userAgent: userAgent?.slice(0, 255),
            expiresAt: sessionExpiry,
          },
        });

        return {
          user,
          tokens,
          organizationId,
        };
      },
    );

    // Send verification email if configured
    const globalSendEmail =
      process.env.SEND_VERIFICATION_EMAIL_ON_REGISTER !== 'true';

    const shouldSend =
      dto.sendVerificationEmail !== undefined
        ? dto.sendVerificationEmail
        : globalSendEmail;

    if (shouldSend) {
      setImmediate(() => {
        this.emailVerificationService
          .createAndSendVerificationEmail(user.id)
          .catch((err) => {
            console.error('Failed to send verification email:', err);
          });
      });
    }

    // Publish registration event after the transaction has committed
    await this.eventPublisher.publish(
      new UserRegisteredEvent({
        payload: {
          userId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        userId: user.id,
        organizationId,
        metadata: {
          requestId: this.requestContextService.get('requestId'),
          ipAddress,
          source: 'auth.register',
        },
      }),
    );

    this.logger.info(LogEvents.AUTH_REGISTER, {
      userId: user.id,
      email: user.email,
      ipAddress,
      userAgent,
    });

    return { user, tokens };
  }
  // ─── Login ──────────────────────────────────────────────────────────

  async login(
    dto: LoginDto,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<{ user: any; tokens: AuthTokens }> {
    // 1. Find user by email
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      this.logger.warn(LogEvents.AUTH_LOGIN + '.failed', {
        email: dto.email,
        reason: 'User not found',
        ipAddress,
      });

      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Check if account is locked
    const attemptRecord = await this.prisma.loginAttempt.findUnique({
      where: { email: user.email },
    });

    if (attemptRecord && attemptRecord.lockedUntil !== null) {
      this.logger.warn(LogEvents.AUTH_LOGIN + '.failed', {
        email: user.email,
        reason: 'Account locked',
        ipAddress,
      });

      throw new HttpException(
        {
          code: 'ACCOUNT_LOCKED',
          message:
            'Your account has been locked due to multiple failed login attempts. A password reset email has been sent.',
        },
        HttpStatus.LOCKED,
      );
    }

    // 3. Validate password
    const isMatch = await this.passwordService.compare(
      dto.password,
      user.passwordHash,
    );

    if (!isMatch) {
      // Handle failed attempt – atomic increment and possible lock
      const { locked, newlyLocked } = await this.handleFailedLoginAttempt(
        user.email,
      );

      if (locked) {
        // If this is the first time the account becomes locked, send a password reset email
        if (newlyLocked) {
          setImmediate(() => {
            this.passwordResetService
              .requestPasswordReset(user.email)
              .catch((err) => {
                console.error('Failed to send password reset email:', err);
              });
          });
        }

        this.logger.warn(LogEvents.AUTH_LOGIN + '.failed', {
          email: user.email,
          reason: 'Account locked after failed attempts',
          ipAddress,
        });

        throw new HttpException(
          {
            code: 'ACCOUNT_LOCKED',
            message:
              'Your account has been locked due to multiple failed login attempts. A password reset email has been sent.',
          },
          HttpStatus.LOCKED,
        );
      }

      this.logger.warn(LogEvents.AUTH_LOGIN + '.failed', {
        email: user.email,
        reason: 'Invalid password',
        ipAddress,
      });

      throw new UnauthorizedException('Invalid credentials');
    }

    // 4. Successful login – proceed with token generation inside a transaction
    const tokens = await this.prisma.$transaction(async (tx) => {
      // Reset login attempts
      await tx.loginAttempt.upsert({
        where: { email: user.email },
        update: { attempts: 0, lockedUntil: null },
        create: { email: user.email, attempts: 0 },
      });

      // Generate tokens
      const tokens = await this.generateTokens({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      // Store refresh token
      const refreshTokenHash = this.hashToken(tokens.refreshToken);
      const refreshExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      await tx.refreshToken.create({
        data: {
          userId: user.id,
          tokenHash: refreshTokenHash,
          expiresAt: refreshExpiry,
        },
      });

      await tx.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });

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

    // Publish login event after the transaction has committed
    await this.eventPublisher.publish(
      new UserLoggedInEvent({
        payload: {
          userId: user.id,
          email: user.email,
        },
        userId: user.id,
        metadata: {
          requestId: this.requestContextService.get('requestId'),
          ipAddress,
          source: 'auth.login',
        },
      }),
    );

    this.logger.info(LogEvents.AUTH_LOGIN, {
      userId: user.id,
      email: user.email,
      ipAddress,
      userAgent,
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

    // Revoke all active sessions for the user
    await this.sessionsService.revokeAllSessions(userId);

    // Publish logout event after successful revocation
    await this.eventPublisher.publish(
      new UserLoggedOutEvent({
        payload: {
          userId,
        },
        userId,
        metadata: {
          requestId: this.requestContextService.get('requestId'),
          source: 'auth.logout',
        },
      }),
    );

    this.logger.info(LogEvents.AUTH_LOGOUT, { userId });
  }

  // ─── Forgot Password ───────────────────────────────────────────────

  async forgotPassword(email: string): Promise<void> {
    await this.passwordResetService.requestPasswordReset(email);
  }

  // ─── Reset Password ────────────────────────────────────────────────

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // 1. Reset password and get the user ID atomically
    const userId = await this.passwordResetService.resetPassword(
      token,
      newPassword,
    );

    // 2. Unlock the account and reset login attempts
    const user = await this.usersService.findById(userId);
    if (user) {
      await this.prisma.loginAttempt.upsert({
        where: { email: user.email },
        update: { attempts: 0, lockedUntil: null },
        create: { email: user.email, attempts: 0 },
      });
    }
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

    await this.eventPublisher.publish(
      new PasswordChangedEvent({
        payload: { userId, email: user.email },
        organizationId: undefined,
        userId,
        metadata: {
          requestId: this.requestContextService.get('requestId'),
          source: 'auth.changePassword',
        },
      }),
    );
  }

  // ─── Email Verification ────────────────────────────────────────────

  async verifyEmail(token: string): Promise<void> {
    await this.emailVerificationService.verifyEmailToken(token);
  }

  async resendVerification(email: string): Promise<void> {
    await this.emailVerificationService.resendVerificationEmail(email);
  }

  // ─── Internal Helpers ──────────────────────────────────────────────

  /**
   * Atomically increments login attempts for the given email.
   * Uses optimistic locking with retries to avoid raw SQL.
   * Returns whether the account is now locked and whether this is the first lock.
   */
  private async handleFailedLoginAttempt(
    email: string,
    maxRetries = 3,
  ): Promise<{ locked: boolean; newlyLocked: boolean }> {
    let attemptsLeft = maxRetries;
    while (attemptsLeft > 0) {
      attemptsLeft--;
      const result = await this.prisma.$transaction(async (tx) => {
        // 1. Get current record (or create if missing)
        let record = await tx.loginAttempt.findUnique({
          where: { email },
        });

        if (!record) {
          try {
            record = await tx.loginAttempt.create({
              data: { email, attempts: 0 },
            });
          } catch (error) {
            if ((error as any).code === 'P2002') {
              // Race condition: another transaction created it, retry
              return { locked: false, newlyLocked: false, retry: true };
            }
            throw error;
          }
        }

        // 2. If already locked, return immediately (no increment)
        if (record.lockedUntil !== null) {
          return { locked: true, newlyLocked: false, retry: false };
        }

        // 3. Compute new values
        const newAttempts = record.attempts + 1;
        let newlyLocked = false;
        const updateData: any = { attempts: newAttempts };

        if (newAttempts >= 3) {
          // Lock the account by setting lockedUntil to a far‑future date
          const farFuture = new Date(
            Date.now() + 100 * 365 * 24 * 60 * 60 * 1000,
          );
          updateData.lockedUntil = farFuture;
          updateData.lockCount = (record.lockCount || 0) + 1;
          newlyLocked = true;
        }

        // 4. Optimistic update: only if record hasn't changed
        const updated = await tx.loginAttempt.updateMany({
          where: {
            email,
            attempts: record.attempts, // ensure no other transaction changed it
            lockedUntil: record.lockedUntil, // ensure still not locked
          },
          data: updateData,
        });

        if (updated.count === 0) {
          // Record changed by another transaction – retry
          return { locked: false, newlyLocked: false, retry: true };
        }

        // 5. Success
        return {
          locked: newAttempts >= 3,
          newlyLocked,
          retry: false,
        };
      });

      if (!result.retry) {
        return { locked: result.locked, newlyLocked: result.newlyLocked };
      }
      // Otherwise loop and retry
    }

    // If we exhaust retries, fallback to reading the final state
    const finalRecord = await this.prisma.loginAttempt.findUnique({
      where: { email },
    });
    if (finalRecord?.lockedUntil !== null) {
      return { locked: true, newlyLocked: false };
    }
    // Not locked (should be rare)
    return { locked: false, newlyLocked: false };
  }

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

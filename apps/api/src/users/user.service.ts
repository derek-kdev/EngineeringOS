// user.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { Prisma, User, Language } from '@prisma/client';
import { AppLogger, AppLoggerToken, LogEvents } from '../observability/logging';
import { PrismaService } from '../prisma/prisma.service';
import { UserMapper } from './mappers/user.mapper';
import { CreateUserInput } from './interfaces/create-user.input';
import { UpdateUserDto } from './dto/update-user.dto';
import { SafeUser } from '../common/security/safe-user.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: UserMapper,
    @Inject(AppLoggerToken) private readonly logger: AppLogger,
  ) {}

  // ─── Public Methods ──────────────────────────────────────────────────

  /**
   * Creates a new user inside a transaction.
   * Optionally creates an organization with owner membership.
   */
  async create(
    input: CreateUserInput,
    tx?: Prisma.TransactionClient, // ADDED: optional transaction client
  ): Promise<SafeUser> {
    try {
      const email = input.email.trim().toLowerCase();
      const firstName = input.firstName.trim();
      const lastName = input.lastName.trim();
      const displayName = `${firstName} ${lastName}`;

      // Use provided transaction client or fallback to default
      const prisma = tx ?? this.prisma;

      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        throw new ConflictException('A user with this email already exists.');
      }

      const user = await prisma.user.create({
        data: {
          email,
          passwordHash: input.passwordHash,
          firstName,
          lastName,
          displayName,
        },
      });

      await prisma.userPreference.create({
        data: { userId: user.id },
      });

      this.logger.info(LogEvents.USER_CREATED, {
        userId: user.id,
        email: user.email,
      });

      return this.mapper.toSafeUser(user);
    } catch (error) {
      this.logger.error(LogEvents.USER_CREATED + '.failed', error, {
        email: input.email,
      });
      throw error;
    }
  }

  /**
   * Finds a user by email (including sensitive fields for auth).
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });
  }

  /**
   * Finds a user by ID and returns a SafeUser.
   */
  async findById(id: string): Promise<SafeUser> {
    const user = await this.getUserOrThrow(id);
    return this.mapper.toSafeUser(user);
  }

  /**
   * Finds a user by ID, including sensitive fields (passwordHash, refreshTokenHash).
   * For internal authentication use only.
   */
  async findByIdWithSensitive(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Updates user profile information.
   * - firstName, lastName, avatarUrl are updated on the User.
   * - timezone and locale are updated on the associated UserPreference.
   */
  async update(id: string, dto: UpdateUserDto): Promise<SafeUser> {
    try {
      const existingUser = await this.getUserOrThrow(id);

      const userUpdateData: Prisma.UserUpdateInput = {};
      if (dto.firstName !== undefined) {
        userUpdateData.firstName = dto.firstName.trim();
      }
      if (dto.lastName !== undefined) {
        userUpdateData.lastName = dto.lastName.trim();
      }
      if (dto.avatarUrl !== undefined) {
        userUpdateData.avatarUrl = dto.avatarUrl;
      }

      if (Object.keys(userUpdateData).length > 0) {
        await this.prisma.user.update({
          where: { id },
          data: userUpdateData,
        });
      }

      if (dto.firstName !== undefined || dto.lastName !== undefined) {
        const firstName =
          dto.firstName !== undefined
            ? dto.firstName.trim()
            : existingUser.firstName;
        const lastName =
          dto.lastName !== undefined
            ? dto.lastName.trim()
            : existingUser.lastName;
        userUpdateData.displayName = `${firstName} ${lastName}`;
      }

      // Apply user updates if any
      if (Object.keys(userUpdateData).length > 0) {
        await this.prisma.user.update({
          where: { id },
          data: userUpdateData,
        });
      }

      //Preference Update
      const prefUpdateData: Prisma.UserPreferenceUpdateInput = {};
      if (dto.timezone !== undefined) {
        prefUpdateData.timezone = dto.timezone;
      }
      //Map locale to language enum value if provided
      if (dto.locale !== undefined) {
        // Convert to uppercase and check if valid enum
        const lang = dto.locale.toUpperCase();
        if (Object.values(Language).includes(lang as Language)) {
          prefUpdateData.language = lang as Language;
        } else {
          // Optionally throw or default to EN
          prefUpdateData.language = Language.EN;
        }
      }

      // Also handle dateFormat/timeFormat if present in DTO
      if (Object.keys(prefUpdateData).length > 0) {
        // Build a separate create object with plain values, not update operations
        const createData: Prisma.UserPreferenceCreateInput = {
          user: { connect: { id } },
        };
        if (dto.timezone !== undefined) {
          createData.timezone = dto.timezone;
        }
        if (dto.locale !== undefined) {
          const lang = dto.locale.toUpperCase();
          if (Object.values(Language).includes(lang as Language)) {
            createData.language = lang as Language;
          } else {
            createData.language = Language.EN;
          }
        }

        await this.prisma.userPreference.upsert({
          where: { userId: id },
          update: prefUpdateData,
          create: createData,
        });
      }

      const updatedUser = await this.getUserOrThrow(id);
      this.logger.info(LogEvents.USER_UPDATED, {
        userId: id,
        fields: Object.keys(dto),
      });
      return this.mapper.toSafeUser(updatedUser);
    } catch (error) {
      this.logger.error(LogEvents.USER_UPDATED + '.failed', error, {
        userId: id,
      });
      throw error;
    }
  }

  /**
   * Updates a user's password hash (used for reset).
   */
  async updatePassword(userId: string, newPasswordHash: string): Promise<void> {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { passwordHash: newPasswordHash },
      });
      this.logger.info(LogEvents.USER_PASSWORD_UPDATED, { userId });
    } catch (error) {
      this.logger.error(LogEvents.USER_PASSWORD_UPDATED + '.failed', error, {
        userId,
      });
      throw error;
    }
  }

  // ─── Token Management Methods ──────────────────────────────────────

  /**
   * MODIFIED: Accepts optional transaction client.
   */
  async createRefreshToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
    tx?: Prisma.TransactionClient, // ADDED
  ): Promise<void> {
    const prisma = tx ?? this.prisma;
    await prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });
  }

  /**
   * MODIFIED: Accepts optional transaction client.
   */
  async createPasswordResetToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
    tx?: Prisma.TransactionClient, // ADDED
  ): Promise<void> {
    const prisma = tx ?? this.prisma;
    await prisma.passwordResetToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });
  }

  /**
   * MODIFIED: Accepts optional transaction client.
   */
  async createVerificationToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
    tx?: Prisma.TransactionClient, // ADDED
  ): Promise<void> {
    const prisma = tx ?? this.prisma;
    await prisma.emailVerificationToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });
  }

  async markEmailVerified(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        emailVerifiedAt: new Date(),
      },
    });
  }

  async activate(id: string): Promise<SafeUser> {
    try {
      const updated = await this.prisma.user.update({
        where: { id },
        data: { isActive: true },
      });
      this.logger.info(LogEvents.USER_ACTIVATED, { userId: id });
      return this.mapper.toSafeUser(updated);
    } catch (error) {
      this.logger.error(LogEvents.USER_ACTIVATED + '.failed', error, {
        userId: id,
      });
      throw error;
    }
  }

  async deactivate(id: string): Promise<SafeUser> {
    try {
      const updated = await this.prisma.user.update({
        where: { id },
        data: { isActive: false },
      });
      this.logger.info(LogEvents.USER_DEACTIVATED, { userId: id });
      return this.mapper.toSafeUser(updated);
    } catch (error) {
      this.logger.error(LogEvents.USER_DEACTIVATED + '.failed', error, {
        userId: id,
      });
      throw error;
    }
  }

  async softDelete(id: string): Promise<void> {
    try {
      await this.prisma.user.update({
        where: { id },
        data: { deletedAt: new Date(), isActive: false },
      });
      this.logger.info(LogEvents.USER_DELETED, { userId: id });
    } catch (error) {
      this.logger.error(LogEvents.USER_DELETED + '.failed', error, {
        userId: id,
      });
      throw error;
    }
  }

  // ─── Private Helpers ────────────────────────────────────────────────

  private async getUserOrThrow(id: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { id, deletedAt: null },
    });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }
}

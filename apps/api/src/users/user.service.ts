// users.service.ts
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  MembershipStatus,
  OrganizationRole,
  Prisma,
  User,
  Language,
} from '@prisma/client';

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
  ) {}

  // ─── Public Methods ──────────────────────────────────────────────────

  /**
   * Creates a new user inside a transaction.
   * Optionally creates an organization with owner membership.
   */
  async create(input: CreateUserInput): Promise<SafeUser> {
    const email = input.email.trim().toLowerCase();
    const firstName = input.firstName.trim();
    const lastName = input.lastName.trim();
    const displayName = `${firstName} ${lastName}`;

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.user.findUnique({ where: { email } });
      if (existing) {
        throw new ConflictException('A user with this email already exists.');
      }

      const user = await tx.user.create({
        data: {
          email,
          passwordHash: input.passwordHash,
          firstName,
          lastName,
          displayName,
        },
      });

      await tx.userPreference.create({
        data: { userId: user.id },
      });

      if (input.organization?.create) {
        if (!input.organization.name || !input.organization.slug) {
          throw new BadRequestException(
            'Organization name and slug are required when creating an organization.',
          );
        }

        const existingOrg = await tx.organization.findUnique({
          where: { slug: input.organization.slug },
        });
        if (existingOrg) {
          throw new ConflictException('Organization slug already exists.');
        }

        const organization = await tx.organization.create({
          data: {
            ownerId: user.id,
            name: input.organization.name,
            slug: input.organization.slug,
          },
        });

        await tx.organizationSettings.create({
          data: { organizationId: organization.id },
        });

        await tx.membership.create({
          data: {
            organizationId: organization.id,
            userId: user.id,
            role: OrganizationRole.OWNER,
            status: MembershipStatus.ACTIVE,
            joinedAt: new Date(),
          },
        });
      }

      return this.mapper.toSafeUser(user);
    });
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
    await this.getUserOrThrow(id);

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
    return this.mapper.toSafeUser(updatedUser);
  }

  /**
   * Updates a user's password hash (used for reset).
   */
  async updatePassword(userId: string, newPasswordHash: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newPasswordHash },
    });
  }

  // ─── Token Management Methods ──────────────────────────────────────

  async createRefreshToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
  ): Promise<void> {
    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });
  }

  async createPasswordResetToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
  ): Promise<void> {
    await this.prisma.passwordResetToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });
  }

  async createVerificationToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
  ): Promise<void> {
    await this.prisma.emailVerificationToken.create({
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
    await this.getUserOrThrow(id);
    const updated = await this.prisma.user.update({
      where: { id },
      data: { isActive: true },
    });
    return this.mapper.toSafeUser(updated);
  }

  async deactivate(id: string): Promise<SafeUser> {
    await this.getUserOrThrow(id);
    const updated = await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
    return this.mapper.toSafeUser(updated);
  }

  async softDelete(id: string): Promise<void> {
    await this.getUserOrThrow(id);
    await this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });
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

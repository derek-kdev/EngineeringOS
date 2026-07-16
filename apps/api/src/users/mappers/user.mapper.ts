import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { SafeUser } from '../../common/security/safe-user.interface';

@Injectable()
export class UserMapper {
  toSafeUser(user: User): SafeUser {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      role: user.role,
      avatarUrl: user.avatarUrl,
      phone: user.phone,
      jobTitle: user.jobTitle,
      locale: user.locale,
      timezone: user.timezone,
      isActive: user.isActive,
      emailVerifiedAt: user.emailVerifiedAt ?? null, // might be null
      lastLoginAt: user.lastLoginAt ?? null, // might be null
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  toSafeUsers(users: User[]): SafeUser[] {
    return users.map((user) => this.toSafeUser(user));
  }
}

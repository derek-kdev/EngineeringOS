/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  OrganizationRole,
  MembershipStatus,
  InvitationStatus,
  Prisma,
} from '@prisma/client';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/';
import * as crypto from 'crypto';
import { generateSlug } from './utils/slug.utils';
import { RoleHierarchy } from './constants/roles';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  // -------------------------------------------------------------------------
  // Organization Onboarding
  // -------------------------------------------------------------------------

  async createOrganization(
    userId: string,
    dto: CreateOrganizationDto,
    prisma?: Prisma.TransactionClient,
  ) {
    const client = prisma ?? this.prisma;

    // Determine slug
    let slug = dto.slug || generateSlug(dto.name);
    if (!dto.slug) {
      let slugExists = await client.organization.findUnique({
        where: { slug },
      });
      let counter = 1;
      while (slugExists) {
        slug = `${generateSlug(dto.name)}-${counter++}`;
        slugExists = await client.organization.findUnique({ where: { slug } });
      }
    }

    // Create organization with settings and owner membership
    const organization = await client.organization.create({
      data: {
        name: dto.name,
        slug,
        description: dto.description,
        industry: dto.industry,
        website: dto.website,
        size: dto.size,
        metadata: dto.metadata,
        ownerId: userId,
        settings: { create: {} },
        memberships: {
          create: {
            userId,
            role: OrganizationRole.OWNER,
            status: MembershipStatus.ACTIVE,
            joinedAt: new Date(),
          },
        },
      },
      include: {
        settings: true,
        memberships: {
          where: { userId },
          include: { user: true },
        },
      },
    });

    return organization;
  }

  async listUserOrganizations(userId: string) {
    return this.prisma.organization.findMany({
      where: {
        memberships: {
          some: {
            userId,
            status: MembershipStatus.ACTIVE,
          },
        },
      },
      include: {
        memberships: {
          where: { userId },
          select: { role: true, status: true },
        },
      },
    });
  }

  async getOrganization(organizationId: string) {
    const org = await this.prisma.organization.findUnique({
      where: { id: organizationId },
      include: {
        settings: true,
        memberships: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                displayName: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });
    if (!org) {
      throw new NotFoundException('Organization not found');
    }
    return org;
  }

  // -------------------------------------------------------------------------
  // Membership Management
  // -------------------------------------------------------------------------

  async listMembers(organizationId: string) {
    const memberships = await this.prisma.membership.findMany({
      where: {
        organizationId,
        status: { in: [MembershipStatus.ACTIVE, MembershipStatus.INVITED] },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            displayName: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { joinedAt: 'asc' },
    });
    return memberships;
  }

  async getMember(organizationId: string, userId: string) {
    const membership = await this.prisma.membership.findUnique({
      where: {
        organizationId_userId: { organizationId, userId },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            displayName: true,
            avatarUrl: true,
          },
        },
      },
    });
    if (!membership) {
      throw new NotFoundException('Member not found in this organization');
    }
    return membership;
  }

  async updateMemberRole(
    organizationId: string,
    targetUserId: string,
    newRole: OrganizationRole,
    currentUserId: string,
  ) {
    // Get current user's membership
    const currentUserMembership = await this.prisma.membership.findUnique({
      where: {
        organizationId_userId: { organizationId, userId: currentUserId },
      },
    });
    if (!currentUserMembership) {
      throw new ForbiddenException('You are not a member of this organization');
    }

    const targetMembership = await this.prisma.membership.findUnique({
      where: {
        organizationId_userId: { organizationId, userId: targetUserId },
      },
    });
    if (!targetMembership) {
      throw new NotFoundException('Target user is not a member');
    }

    // Prevent self demotion? Not strictly required but can add.

    // Enforce role hierarchy: current user must have higher or equal role than target?
    const currentRoleWeight = RoleHierarchy[currentUserMembership.role];
    const newRoleWeight = RoleHierarchy[newRole];

    if (newRoleWeight > currentRoleWeight) {
      throw new ForbiddenException(
        `You cannot assign a role (${newRole}) higher than your own (${currentUserMembership.role})`,
      );
    }

    // OWNER can do anything; ADMIN can manage MEMBER and VIEWER, but not OWNER or ADMIN?
    if (currentUserMembership.role === OrganizationRole.ADMIN) {
      const targetRoleWeight = RoleHierarchy[targetMembership.role];
      if (targetRoleWeight >= RoleHierarchy[OrganizationRole.ADMIN]) {
        throw new ForbiddenException(
          'ADMIN cannot modify OWNER or other ADMIN members',
        );
      }
      // Also ensure newRole is not ADMIN or OWNER
      if (newRoleWeight >= RoleHierarchy[OrganizationRole.ADMIN]) {
        throw new ForbiddenException(
          'ADMIN cannot assign ADMIN or OWNER roles',
        );
      }
    }

    // Prevent removing the last OWNER (check if target is OWNER and only one)
    if (targetMembership.role === OrganizationRole.OWNER) {
      const ownerCount = await this.prisma.membership.count({
        where: {
          organizationId,
          role: OrganizationRole.OWNER,
          status: MembershipStatus.ACTIVE,
        },
      });
      if (ownerCount === 1) {
        throw new BadRequestException(
          'Cannot change the role of the last OWNER',
        );
      }
    }

    // Update role
    const updated = await this.prisma.membership.update({
      where: {
        organizationId_userId: { organizationId, userId: targetUserId },
      },
      data: { role: newRole },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            displayName: true,
          },
        },
      },
    });

    // Optionally: audit log here

    return updated;
  }

  async removeMember(
    organizationId: string,
    targetUserId: string,
    currentUserId: string,
  ) {
    // Get current user's membership
    const currentUserMembership = await this.prisma.membership.findUnique({
      where: {
        organizationId_userId: { organizationId, userId: currentUserId },
      },
    });
    if (!currentUserMembership) {
      throw new ForbiddenException('You are not a member of this organization');
    }

    const targetMembership = await this.prisma.membership.findUnique({
      where: {
        organizationId_userId: { organizationId, userId: targetUserId },
      },
    });
    if (!targetMembership) {
      throw new NotFoundException('Target user is not a member');
    }

    // Cannot remove self? Probably allowed but we'll let them remove themselves if they are not last OWNER.
    if (targetUserId === currentUserId) {
      // Check if last OWNER
      const ownerCount = await this.prisma.membership.count({
        where: {
          organizationId,
          role: OrganizationRole.OWNER,
          status: MembershipStatus.ACTIVE,
        },
      });
      if (
        ownerCount === 1 &&
        targetMembership.role === OrganizationRole.OWNER
      ) {
        throw new BadRequestException(
          'Cannot remove yourself as the last OWNER. Transfer ownership first.',
        );
      }
      // Remove self
      await this.prisma.membership.delete({
        where: {
          organizationId_userId: { organizationId, userId: targetUserId },
        },
      });
      return { message: 'You have left the organization' };
    }

    // Role-based permission: only OWNER and ADMIN can remove others
    // OWNER can remove anyone; ADMIN can remove MEMBER and VIEWER only
    if (currentUserMembership.role === OrganizationRole.ADMIN) {
      const targetRoleWeight = RoleHierarchy[targetMembership.role];
      if (targetRoleWeight >= RoleHierarchy[OrganizationRole.ADMIN]) {
        throw new ForbiddenException(
          'ADMIN cannot remove OWNER or other ADMIN members',
        );
      }
    }

    // Prevent removing the last OWNER
    if (targetMembership.role === OrganizationRole.OWNER) {
      const ownerCount = await this.prisma.membership.count({
        where: {
          organizationId,
          role: OrganizationRole.OWNER,
          status: MembershipStatus.ACTIVE,
        },
      });
      if (ownerCount === 1) {
        throw new BadRequestException('Cannot remove OWNER');
      }
    }

    // Remove (hard delete or soft delete? For now hard delete; but we have status REMOVED)
    // According to schema, we can set status to REMOVED.
    // Let's update status to REMOVED instead of deleting.
    const updated = await this.prisma.membership.update({
      where: {
        organizationId_userId: { organizationId, userId: targetUserId },
      },
      data: {
        status: MembershipStatus.REMOVED,
        removedAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            displayName: true,
          },
        },
      },
    });

    return updated;
  }

  async updateOrganization(organizationId: string, dto: UpdateOrganizationDto) {
    const { name, description, industry, website, size, metadata, settings } =
      dto;

    // If name changes, update slug accordingly
    let slug: string | undefined;
    if (name) {
      let newSlug = generateSlug(name);
      let slugExists = await this.prisma.organization.findUnique({
        where: { slug: newSlug },
      });
      // If the new slug collides with another organization (excluding current)
      if (slugExists && slugExists.id !== organizationId) {
        let counter = 1;
        while (slugExists) {
          newSlug = `${generateSlug(name)}-${counter++}`;
          slugExists = await this.prisma.organization.findUnique({
            where: { slug: newSlug },
          });
          if (slugExists && slugExists.id === organizationId) break;
        }
      }
      slug = newSlug;
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedOrg = await tx.organization.update({
        where: { id: organizationId },
        data: {
          name,
          slug,
          description,
          industry,
          website,
          size,
          metadata,
          settings: settings
            ? {
                update: {
                  timezone: settings.timezone,
                  currency: settings.currency,
                  defaultRole: settings.defaultRole,
                  dateFormat: settings.dateFormat,
                  timeFormat: settings.timeFormat,
                  weekStartsOn: settings.weekStartsOn,
                  allowGuestAccess: settings.allowGuestAccess,
                  metadata: settings.metadata,
                },
              }
            : undefined,
        },
        include: { settings: true },
      });
      return updatedOrg;
    });
  }

  async deleteOrganization(organizationId: string) {
    // Optional: check if there are active members beyond owner? Allow deletion anyway.
    // Cascade delete will remove all related entities (memberships, invitations, etc.)
    await this.prisma.organization.delete({
      where: { id: organizationId },
    });
    return { message: 'Organization deleted successfully' };
  }

  async declineInvitation(token: string) {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const invitation = await this.prisma.invitation.findUnique({
      where: { tokenHash },
    });
    if (!invitation) {
      throw new BadRequestException('Invalid invitation token');
    }

    if (invitation.status !== InvitationStatus.PENDING) {
      throw new BadRequestException('Invitation already processed');
    }
    if (invitation.expiresAt < new Date()) {
      throw new BadRequestException('Invitation has expired');
    }

    // Mark as CANCELLED (you may also introduce a DECLINED status via migration)
    await this.prisma.invitation.update({
      where: { id: invitation.id },
      data: { status: InvitationStatus.CANCELLED },
    });

    return { message: 'Invitation declined successfully' };
  }

  // -------------------------------------------------------------------------
  // Invitations
  // -------------------------------------------------------------------------

  async inviteMember(
    organizationId: string,
    invitedById: string,
    email: string,
    role: OrganizationRole,
  ) {
    // Check if user already a member (active or invited)
    const existingMembership = await this.prisma.membership.findUnique({
      where: {
        organizationId_userId: { organizationId, userId: invitedById }, // Not needed, we need to check by email -> we need to find user by email
      },
    });
    // Actually we need to find user by email first, if exists.
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user) {
      // Check if this user is already a member
      const membership = await this.prisma.membership.findUnique({
        where: {
          organizationId_userId: { organizationId, userId: user.id },
        },
      });
      if (membership && membership.status !== MembershipStatus.REMOVED) {
        throw new ConflictException('User is already a member or invited');
      }
    }

    // Check for active pending invitation for this email
    const existingInvitation = await this.prisma.invitation.findFirst({
      where: {
        organizationId,
        email,
        status: InvitationStatus.PENDING,
        expiresAt: { gt: new Date() },
      },
    });
    if (existingInvitation) {
      throw new ConflictException(
        'An active invitation already exists for this email',
      );
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Expiration: 7 days
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const invitation = await this.prisma.invitation.create({
      data: {
        organizationId,
        invitedById,
        email,
        role,
        tokenHash,
        expiresAt,
        status: InvitationStatus.PENDING,
      },
    });

    // Return invitation metadata (exclude tokenHash)
    // Also include organization name for email context.
    const organization = await this.prisma.organization.findUnique({
      where: { id: organizationId },
      select: { name: true },
    });

    // We'll return the invitation without tokenHash and raw token.
    // The raw token should be sent to the user via email (we can log it for now).
    // In real app, we would send email with link containing token.
    // For now, we return token only for development.
    // Ideally we return just invitation id and status.
    // We'll also return the token in response for easier testing (but not in production)
    return {
      ...invitation,
      tokenHash: undefined,
      token, // For development; remove in production
    };
  }

  async acceptInvitation(token: string) {
    // Find invitation by tokenHash: we need to hash the incoming token and compare
    // We'll have to fetch all pending invitations? Not efficient.
    // Instead, we can store the tokenHash and compare.
    // We can iterate? Better: we can use a technique: store tokenHash and use bcrypt compare.
    // But we cannot query by tokenHash directly with bcrypt. We could store hash and use a partial index? Not possible.
    // Alternative: we can store tokenHash and use a unique index, then compare candidate token using bcrypt.
    // But we need to find the invitation by something else? We could use email? Not reliable.
    // Instead, we can compute the hash of the incoming token and query by that hash directly.
    // Since we use bcrypt, we can't query by hash (different salts).
    // We can use a simpler hash like SHA256 for token (which is deterministic) and store that.
    // But the spec says "store only a hashed token", we can use bcrypt for storage but then we need to retrieve all pending tokens and compare.
    // For performance, we can store a SHA256 hash (deterministic) and use that for lookup, while also using bcrypt for additional security? Not necessary.
    // I'll use SHA256 hex string as tokenHash for lookup, and also store that as unique.
    // That way we can query by tokenHash. But we also need to ensure it's secure (SHA256 is okay for random tokens).
    // I'll change to SHA256 for tokenHash.
    // Let's adjust: when creating invitation, we compute tokenHash = sha256(token). Then we can query by that.

    // However, we already used bcrypt in inviteMember. We'll refactor to use sha256 for tokenHash.
    // For simplicity, we'll implement tokenHash as SHA256 hex.
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Find invitation
    const invitation = await this.prisma.invitation.findUnique({
      where: { tokenHash },
    });
    if (!invitation) {
      throw new BadRequestException('Invalid invitation token');
    }

    // Check status
    if (invitation.status !== InvitationStatus.PENDING) {
      throw new BadRequestException('Invitation already used or cancelled');
    }
    if (invitation.expiresAt < new Date()) {
      throw new BadRequestException('Invitation has expired');
    }

    // Check if the user exists by email
    const user = await this.prisma.user.findUnique({
      where: { email: invitation.email },
    });
    if (!user) {
      // In a real system, we might auto-register the user.
      // For now, we assume user must exist (they should have signed up).
      // We'll throw an error suggesting they need to register first.
      throw new BadRequestException(
        'No account found with this email. Please register first.',
      );
    }

    // Check if user is already a member (active or invited)
    const existingMembership = await this.prisma.membership.findUnique({
      where: {
        organizationId_userId: {
          organizationId: invitation.organizationId,
          userId: user.id,
        },
      },
    });
    if (
      existingMembership &&
      existingMembership.status !== MembershipStatus.REMOVED
    ) {
      throw new ConflictException(
        'You are already a member of this organization',
      );
    }

    // Execute transaction: create membership, update invitation
    return this.prisma.$transaction(async (tx) => {
      // If membership exists but was REMOVED, reactivate? Or treat as new? We'll update status to ACTIVE.
      let membership;
      if (existingMembership) {
        membership = await tx.membership.update({
          where: {
            organizationId_userId: {
              organizationId: invitation.organizationId,
              userId: user.id,
            },
          },
          data: {
            status: MembershipStatus.ACTIVE,
            role: invitation.role,
            joinedAt: new Date(),
            removedAt: null,
          },
        });
      } else {
        membership = await tx.membership.create({
          data: {
            organizationId: invitation.organizationId,
            userId: user.id,
            role: invitation.role,
            status: MembershipStatus.ACTIVE,
            joinedAt: new Date(),
          },
        });
      }

      // Update invitation
      await tx.invitation.update({
        where: { id: invitation.id },
        data: {
          status: InvitationStatus.ACCEPTED,
          acceptedAt: new Date(),
        },
      });

      return membership;
    });
  }

  // -------------------------------------------------------------------------
  // Utilities for Guards (Membership verification, role check)
  // -------------------------------------------------------------------------

  async getMembership(organizationId: string, userId: string) {
    return this.prisma.membership.findUnique({
      where: {
        organizationId_userId: { organizationId, userId },
      },
    });
  }

  async isMember(organizationId: string, userId: string): Promise<boolean> {
    const membership = await this.getMembership(organizationId, userId);
    return membership !== null && membership.status === MembershipStatus.ACTIVE;
  }

  async getUserRoleInOrganization(
    organizationId: string,
    userId: string,
  ): Promise<OrganizationRole | null> {
    const membership = await this.getMembership(organizationId, userId);
    return membership?.role ?? null;
  }
}

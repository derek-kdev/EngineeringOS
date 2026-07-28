/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  Inject,
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
import { AppLogger, AppLoggerToken, LogEvents } from '../observability/logging';
import { SearchIndexService } from '../search/search-index.service';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly searchIndexService: SearchIndexService,
    @Inject(AppLoggerToken) private readonly logger: AppLogger,
  ) {}

  // -------------------------------------------------------------------------
  // Organization Onboarding
  // -------------------------------------------------------------------------

  async createOrganization(
    userId: string,
    dto: CreateOrganizationDto,
    prisma?: Prisma.TransactionClient,
  ) {
    try {
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
          slugExists = await client.organization.findUnique({
            where: { slug },
          });
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

      await this.searchIndexService.index({
        entityType: 'ORGANIZATION',
        entityId: organization.id,
        title: organization.name,
        description: organization.description ?? '',
        visibility: 'GLOBAL',
        metadata: {
          industry: organization.industry,
          size: organization.size,
          slug: organization.slug,
        },
      });

      this.logger.info(LogEvents.ORGANIZATION_CREATED, {
        organizationId: organization.id,
        name: organization.name,
        slug: organization.slug,
        ownerId: userId,
      });
      return organization;
    } catch (error) {
      this.logger.error(LogEvents.ORGANIZATION_CREATED + '.failed', error, {
        userId,
        name: dto.name,
      });
      throw error;
    }
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

  async deleteOrganization(organizationId: string) {
    try {
      await this.prisma.organization.delete({ where: { id: organizationId } });
      this.logger.info(LogEvents.ORGANIZATION_DELETED, { organizationId });
      return { message: 'Organization deleted successfully' };
    } catch (error) {
      this.logger.error(LogEvents.ORGANIZATION_DELETED + '.failed', error, {
        organizationId,
      });
      throw error;
    }
  }

  async updateOrganization(organizationId: string, dto: UpdateOrganizationDto) {
    try {
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

            if (slugExists && slugExists.id === organizationId) {
              break;
            }
          }
        }

        slug = newSlug;
      }

      const updatedOrg = await this.prisma.$transaction(async (tx) => {
        return tx.organization.update({
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
          include: {
            settings: true,
          },
        });
      });

      this.logger.info(LogEvents.ORGANIZATION_UPDATED, {
        organizationId,
        updates: Object.keys(dto),
      });

      return updatedOrg;
    } catch (error) {
      this.logger.error(LogEvents.ORGANIZATION_UPDATED + '.failed', error, {
        organizationId,
      });

      throw error;
    }
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
    try {
      const currentUserMembership = await this.prisma.membership.findUnique({
        where: {
          organizationId_userId: {
            organizationId,
            userId: currentUserId,
          },
        },
      });

      if (!currentUserMembership) {
        throw new ForbiddenException(
          'You are not a member of this organization',
        );
      }

      const targetMembership = await this.prisma.membership.findUnique({
        where: {
          organizationId_userId: {
            organizationId,
            userId: targetUserId,
          },
        },
      });

      if (!targetMembership) {
        throw new NotFoundException('Target user is not a member');
      }

      const currentRoleWeight = RoleHierarchy[currentUserMembership.role];

      const newRoleWeight = RoleHierarchy[newRole];

      if (newRoleWeight > currentRoleWeight) {
        throw new ForbiddenException(
          `You cannot assign a role (${newRole}) higher than your own (${currentUserMembership.role})`,
        );
      }

      if (currentUserMembership.role === OrganizationRole.ADMIN) {
        const targetRoleWeight = RoleHierarchy[targetMembership.role];

        if (targetRoleWeight >= RoleHierarchy[OrganizationRole.ADMIN]) {
          throw new ForbiddenException(
            'ADMIN cannot modify OWNER or other ADMIN members',
          );
        }

        if (newRoleWeight >= RoleHierarchy[OrganizationRole.ADMIN]) {
          throw new ForbiddenException(
            'ADMIN cannot assign ADMIN or OWNER roles',
          );
        }
      }

      const updatedMembership = await this.prisma.membership.update({
        where: {
          organizationId_userId: {
            organizationId,
            userId: targetUserId,
          },
        },
        data: {
          role: newRole,
        },
      });

      this.logger.info(LogEvents.MEMBERSHIP_ROLE_UPDATED, {
        organizationId,
        targetUserId,
        changedBy: currentUserId,
        previousRole: targetMembership.role,
        newRole,
      });

      return updatedMembership;
    } catch (error) {
      this.logger.error(LogEvents.MEMBERSHIP_ROLE_UPDATED + '.failed', error, {
        organizationId,
        targetUserId,
        changedBy: currentUserId,
      });

      throw error;
    }
  }

  async removeMember(
    organizationId: string,
    targetUserId: string,
    currentUserId: string,
  ) {
    try {
      // Get current user's membership
      const currentUserMembership = await this.prisma.membership.findUnique({
        where: {
          organizationId_userId: {
            organizationId,
            userId: currentUserId,
          },
        },
      });

      if (!currentUserMembership) {
        throw new ForbiddenException(
          'You are not a member of this organization',
        );
      }

      const targetMembership = await this.prisma.membership.findUnique({
        where: {
          organizationId_userId: {
            organizationId,
            userId: targetUserId,
          },
        },
      });

      if (!targetMembership) {
        throw new NotFoundException('Target user is not a member');
      }

      // Self removal
      if (targetUserId === currentUserId) {
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

        const updatedSelfRemoval = await this.prisma.membership.update({
          where: {
            organizationId_userId: {
              organizationId,
              userId: targetUserId,
            },
          },
          data: {
            status: MembershipStatus.REMOVED,
            removedAt: new Date(),
          },
        });

        this.logger.info(LogEvents.MEMBERSHIP_REMOVED, {
          organizationId,
          removedUserId: targetUserId,
          removedBy: currentUserId,
          previousRole: targetMembership.role,
          reason: 'Self removal',
        });

        return {
          message: 'You have left the organization',
          membership: updatedSelfRemoval,
        };
      }

      // Role-based permission:
      // OWNER can remove anyone
      // ADMIN can remove MEMBER and VIEWER only
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

      // Soft remove member
      const updated = await this.prisma.membership.update({
        where: {
          organizationId_userId: {
            organizationId,
            userId: targetUserId,
          },
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

      this.logger.info(LogEvents.MEMBERSHIP_REMOVED, {
        organizationId,
        removedUserId: targetUserId,
        removedBy: currentUserId,
        previousRole: targetMembership.role,
      });

      return updated;
    } catch (error) {
      this.logger.error(LogEvents.MEMBERSHIP_REMOVED + '.failed', error, {
        organizationId,
        removedUserId: targetUserId,
        removedBy: currentUserId,
      });

      throw error;
    }
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
    try {
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

      this.logger.info(LogEvents.INVITATION_SENT, {
        organizationId,
        invitedBy: invitedById,
        email,
        role,
        invitationId: invitation.id,
      });

      // The raw token should be sent to the user via email (we can log it for now).
      // We'll also return the token in response for easier testing (but not in production)
      return {
        ...invitation,
        tokenHash: undefined,
        token, // For development; remove in production
      };
    } catch (error) {
      this.logger.error(LogEvents.INVITATION_SENT + '.failed', error, {
        organizationId,
        email,
      });
      throw error;
    }
  }

  async acceptInvitation(token: string) {
    try {
      const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

      const invitation = await this.prisma.invitation.findUnique({
        where: { tokenHash },
      });

      if (!invitation) {
        throw new BadRequestException('Invalid invitation token');
      }

      if (invitation.status !== InvitationStatus.PENDING) {
        throw new BadRequestException('Invitation already used or cancelled');
      }

      if (invitation.expiresAt < new Date()) {
        throw new BadRequestException('Invitation has expired');
      }

      const user = await this.prisma.user.findUnique({
        where: { email: invitation.email },
      });

      if (!user) {
        throw new BadRequestException(
          'No account found with this email. Please register first.',
        );
      }

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

      const membership = await this.prisma.$transaction(async (tx) => {
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

        await tx.invitation.update({
          where: { id: invitation.id },
          data: {
            status: InvitationStatus.ACCEPTED,
            acceptedAt: new Date(),
          },
        });

        return membership;
      });

      this.logger.info(LogEvents.INVITATION_ACCEPTED, {
        organizationId: membership.organizationId,
        userId: membership.userId,
        role: membership.role,
      });

      return membership;
    } catch (error) {
      this.logger.error(LogEvents.INVITATION_ACCEPTED + '.failed', error, {
        tokenProvided: !!token,
      });

      throw error;
    }
  }

  async declineInvitation(token: string) {
    try {
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

      await this.prisma.invitation.update({
        where: { id: invitation.id },
        data: {
          status: InvitationStatus.CANCELLED,
        },
      });

      this.logger.info(LogEvents.INVITATION_DECLINED, {
        invitationId: invitation.id,
        organizationId: invitation.organizationId,
        email: invitation.email,
      });

      return {
        message: 'Invitation declined successfully',
      };
    } catch (error) {
      this.logger.error(LogEvents.INVITATION_DECLINED + '.failed', error, {
        tokenProvided: !!token,
      });

      throw error;
    }
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

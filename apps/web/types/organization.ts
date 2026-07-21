// apps/web/types/organization.ts

export enum OrganizationRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
  VIEWER = "VIEWER",
}

export enum InvitationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED",
}

export enum MembershipStatus {
  INVITED = "INVITED",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  REMOVED = "REMOVED",
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatarUrl?: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  description?: string | null;
  industry?: string | null;
  website?: string | null;
  size?: string | null;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  ownerId: string;
  owner?: User;
  memberships?: Membership[];
  settings?: OrganizationSettings;
}

export interface Membership {
  id: string;
  organizationId: string;
  userId: string;
  role: OrganizationRole;
  status: MembershipStatus;
  joinedAt?: string | null;
  removedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: User;
  organization?: Organization;
}

export interface Invitation {
  id: string;
  organizationId: string;
  invitedById: string;
  email: string;
  role: OrganizationRole;
  status: InvitationStatus;
  tokenHash: string;
  expiresAt: string;
  acceptedAt?: string | null;
  cancelledAt?: string | null;
  createdAt: string;
  updatedAt: string;
  organization?: Organization;
  invitedBy?: User;
}

export interface OrganizationSettings {
  id: string;
  organizationId: string;
  timezone: string;
  currency: string;
  defaultRole: OrganizationRole;
  dateFormat: string;
  timeFormat: string;
  weekStartsOn: number;
  allowGuestAccess: boolean;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

// DTOs
export interface CreateOrganizationDto {
  name: string;
  slug?: string;
  description?: string;
  industry?: string;
  website?: string;
  size?: string;
}

export interface UpdateOrganizationDto {
  name?: string;
  description?: string;
  industry?: string;
  website?: string;
  size?: string;
  logoUrl?: string;
}

export interface UpdateMemberRoleDto {
  role: OrganizationRole;
}

export interface InviteMemberDto {
  email: string;
  role: OrganizationRole;
  message?: string;
}
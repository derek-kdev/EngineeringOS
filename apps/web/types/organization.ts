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

export enum DateFormat {
  DMY = "DMY",
  MDY = "MDY",
  YMD = "YMD",
}

export enum TimeFormat {
  TWELVE_HOUR = "TWELVE_HOUR",
  TWENTY_FOUR_HOUR = "TWENTY_FOUR_HOUR",
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatarUrl?: string;
}

export interface OrganizationSettings {
  id: string;
  organizationId: string;
  timezone: string;
  currency: string;
  defaultRole: OrganizationRole;
  dateFormat: DateFormat;
  timeFormat: TimeFormat;
  weekStartsOn: number;
  allowGuestAccess: boolean;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
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
  metadata?: Record<string, unknown> | null;
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
  tokenHash?: string;
  token?: string;
  expiresAt: string;
  acceptedAt?: string | null;
  cancelledAt?: string | null;
  createdAt: string;
  updatedAt: string;
  organization?: Organization;
  invitedBy?: User;
}


// -----------------------------------------------------------------------------
// DTOs
// -----------------------------------------------------------------------------

export interface CreateOrganizationDto {
  name: string;
  slug?: string;
  description?: string;
  industry?: string;
  website?: string;
  size?: string;
  metadata?: Record<string, unknown>;
}

export interface OrganizationSettingsUpdateDto {
  timezone?: string;
  currency?: string;
  defaultRole?: OrganizationRole;
  dateFormat?: DateFormat;
  timeFormat?: TimeFormat;
  weekStartsOn?: number;
  allowGuestAccess?: boolean;
  metadata?: Record<string, unknown>;
}

export interface UpdateOrganizationDto {
  name?: string;
  description?: string;
  industry?: string;
  website?: string;
  size?: string;
  metadata?: Record<string, unknown>;
  settings?: OrganizationSettingsUpdateDto;
}

export interface UpdateMemberRoleDto {
  role: OrganizationRole;
}

export interface InviteMemberDto {
  email: string;
  role: OrganizationRole;
}

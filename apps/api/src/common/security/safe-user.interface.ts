export interface SafeUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string | null;
  role: string;
  avatarUrl: string | null;
  phone: string | null;
  jobTitle: string | null;
  locale: string;
  timezone: string;
  isActive: boolean;
  emailVerifiedAt: Date | null;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SafeUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string | null;
  avatarUrl: string | null;
  phone: string | null;
  jobTitle: string | null;
  locale: string;
  timezone: string;
  isActive: boolean;
  emailVerifiedAt: Date | null;
  lastLoginAt: Date | null; // added
  createdAt: Date;
  updatedAt: Date;
}

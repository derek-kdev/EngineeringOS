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

  emailVerified: boolean;

  createdAt: Date;

  updatedAt: Date;
}

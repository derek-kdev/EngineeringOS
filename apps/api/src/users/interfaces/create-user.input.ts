export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  organization?: {
    create: boolean;
    name?: string;
    slug?: string;
  };
}

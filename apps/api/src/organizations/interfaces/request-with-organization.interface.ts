import { Request } from 'express';
import { Membership } from '@prisma/client';

export interface RequestWithOrganization extends Request {
  user: any; // from JwtAuthGuard
  membership: Membership;
  organizationId: string;
}

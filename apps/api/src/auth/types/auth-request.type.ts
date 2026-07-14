import { Request } from 'express';

import { AuthenticatedUser } from '../interfaces';

export type AuthRequest = Request & {
  user: AuthenticatedUser;
};

import { SetMetadata } from '@nestjs/common';

export const SKIP_EMAIL_VERIFICATION_KEY = 'skipEmailVerification';

/**
 * Decorator to skip email verification check for a specific route.
 * Use on endpoints that should remain accessible to unverified users.
 */
export const SkipEmailVerification = () =>
  SetMetadata(SKIP_EMAIL_VERIFICATION_KEY, true);

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentOrganization = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    // The organization ID is attached by OrganizationMemberGuard
    const organizationId = (request as any).organizationId;
    if (!organizationId) {
      throw new Error(
        'Organization ID not available. Ensure OrganizationMemberGuard is applied.',
      );
    }
    return organizationId;
  },
);

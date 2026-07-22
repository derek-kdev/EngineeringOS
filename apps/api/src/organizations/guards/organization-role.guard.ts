import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { OrganizationService } from '../organization.service';
import { OrganizationRole, RoleHierarchy } from '../constants/roles';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class OrganizationRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private organizationService: OrganizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<OrganizationRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No roles required, allow access
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = (request as any).user;
    const organizationId = (request as any).organizationId;

    if (!user || !organizationId) {
      throw new ForbiddenException('Organization context not resolved');
    }

    const membership = await this.organizationService.getMembership(
      organizationId,
      user.id,
    );
    if (!membership || membership.status !== 'ACTIVE') {
      throw new ForbiddenException('You are not an active member');
    }

    const userRole = membership.role;
    const userWeight = RoleHierarchy[userRole];

    // Check if user's role weight is >= required role weight (highest required)
    // We'll allow if user has any of the required roles (OR), but we can also implement minimum weight.
    // For simplicity: check if user has at least one of the required roles.
    const hasRequired = requiredRoles.some(
      (role) => RoleHierarchy[role] <= userWeight,
    );
    if (!hasRequired) {
      throw new ForbiddenException(
        `Insufficient role. Required: ${requiredRoles.join(' or ')}`,
      );
    }

    return true;
  }
}

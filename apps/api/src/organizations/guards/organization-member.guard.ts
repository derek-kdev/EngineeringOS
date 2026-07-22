/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { OrganizationService } from '../organization.service';

@Injectable()
export class OrganizationMemberGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly organizationService: OrganizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = (request as any).user;
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    // Resolve organization ID: from param, or header, or body?
    // We'll support both param (:organizationId) and header (X-Organization-Id)
    let organizationId: string | string[] | undefined =
      request.params.organizationId || request.headers['x-organization-id'];

    // Normalize: if it's an array, take the first element
    if (Array.isArray(organizationId)) {
      organizationId = organizationId[0];
    }

    if (!organizationId) {
      throw new BadRequestException('Organization ID not provided');
    }

    // Verify organization exists
    const org = await this.prisma.organization.findUnique({
      where: { id: organizationId },
      select: { id: true },
    });
    if (!org) {
      throw new NotFoundException('Organization not found');
    }

    // Check membership
    const membership = await this.organizationService.getMembership(
      organizationId,
      user.id,
    );
    if (!membership || membership.status !== 'ACTIVE') {
      throw new ForbiddenException('You are not a member of this organization');
    }

    // Attach membership and organization to request for later use
    (request as any).membership = membership;
    (request as any).organizationId = organizationId;

    return true;
  }
}

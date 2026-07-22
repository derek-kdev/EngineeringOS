import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { OrganizationService } from './organization.service';
import {
  CreateOrganizationDto,
  InviteMemberDto,
  AcceptInvitationDto,
  UpdateMembershipRoleDto,
  UpdateOrganizationDto,
  DeclineInvitationDto,
} from './dto';
import { OrganizationMemberGuard } from './guards/organization-member.guard';
import { OrganizationRoleGuard } from './guards/organization-role.guard';
import { Roles } from './decorators/roles.decorator';
import { OrganizationRole } from './constants/roles';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Organizations')
@Controller('organizations')
@UseGuards(JwtAuthGuard)
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new organization' })
  @ApiResponse({
    status: 201,
    description: 'Organization created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async createOrganization(
    @CurrentUser() user: User,
    @Body() dto: CreateOrganizationDto,
  ) {
    return this.organizationService.createOrganization(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List organizations for the current user' })
  @ApiResponse({
    status: 200,
    description: 'Organizations retrieved successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async listUserOrganizations(@CurrentUser() user: User) {
    return this.organizationService.listUserOrganizations(user.id);
  }

  @Get(':organizationId')
  @UseGuards(OrganizationMemberGuard)
  @ApiOperation({ summary: 'Get organization details' })
  @ApiResponse({
    status: 200,
    description: 'Organization retrieved successfully.',
  })
  @ApiResponse({ status: 403, description: 'Access denied.' })
  @ApiResponse({ status: 404, description: 'Organization not found.' })
  async getOrganization(@Param('organizationId') organizationId: string) {
    return this.organizationService.getOrganization(organizationId);
  }

  // Memberships

  @Get(':organizationId/members')
  @UseGuards(OrganizationMemberGuard)
  @ApiOperation({ summary: 'List organization members' })
  @ApiResponse({ status: 200, description: 'Members retrieved successfully.' })
  @ApiResponse({ status: 403, description: 'Access denied.' })
  async listMembers(@Param('organizationId') organizationId: string) {
    return this.organizationService.listMembers(organizationId);
  }

  @Get(':organizationId/members/:userId')
  @UseGuards(OrganizationMemberGuard)
  @ApiOperation({ summary: 'Get organization member' })
  @ApiResponse({ status: 200, description: 'Member retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Member not found.' })
  @ApiResponse({ status: 403, description: 'Access denied.' })
  async getMember(
    @Param('organizationId') organizationId: string,
    @Param('userId') userId: string,
  ) {
    return this.organizationService.getMember(organizationId, userId);
  }

  @Patch(':organizationId/members/:userId')
  @UseGuards(OrganizationMemberGuard, OrganizationRoleGuard)
  @Roles(OrganizationRole.OWNER, OrganizationRole.ADMIN)
  @ApiOperation({ summary: 'Update organization member role' })
  @ApiResponse({
    status: 200,
    description: 'Member role updated successfully.',
  })
  @ApiResponse({ status: 403, description: 'Insufficient permissions.' })
  @ApiResponse({ status: 404, description: 'Member not found.' })
  async updateMemberRole(
    @Param('organizationId') organizationId: string,
    @Param('userId') userId: string,
    @Body() dto: UpdateMembershipRoleDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.organizationService.updateMemberRole(
      organizationId,
      userId,
      dto.role,
      currentUser.id,
    );
  }

  @Delete(':organizationId/members/:userId')
  @UseGuards(OrganizationMemberGuard, OrganizationRoleGuard)
  @Roles(OrganizationRole.OWNER, OrganizationRole.ADMIN)
  @ApiOperation({ summary: 'Remove member from organization' })
  @ApiResponse({ status: 200, description: 'Member removed successfully.' })
  @ApiResponse({ status: 403, description: 'Insufficient permissions.' })
  @ApiResponse({ status: 404, description: 'Member not found.' })
  async removeMember(
    @Param('organizationId') organizationId: string,
    @Param('userId') userId: string,
    @CurrentUser() currentUser: User,
  ) {
    return this.organizationService.removeMember(
      organizationId,
      userId,
      currentUser.id,
    );
  }

  // Invitations

  @Post(':organizationId/invitations')
  @UseGuards(OrganizationMemberGuard, OrganizationRoleGuard)
  @Roles(OrganizationRole.OWNER, OrganizationRole.ADMIN)
  @ApiOperation({ summary: 'Invite a user to the organization' })
  @ApiResponse({ status: 201, description: 'Invitation sent successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid invitation request.' })
  @ApiResponse({ status: 403, description: 'Insufficient permissions.' })
  async inviteMember(
    @Param('organizationId') organizationId: string,
    @Body() dto: InviteMemberDto,
    @CurrentUser() user: User,
  ) {
    return this.organizationService.inviteMember(
      organizationId,
      user.id,
      dto.email,
      dto.role,
    );
  }

  @Post('invitations/accept')
  @Public()
  @ApiOperation({ summary: 'Accept an organization invitation' })
  @ApiResponse({
    status: 200,
    description: 'Invitation accepted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid or expired invitation token.',
  })
  async acceptInvitation(@Body() dto: AcceptInvitationDto) {
    return this.organizationService.acceptInvitation(dto.token);
  }

  @Patch(':organizationId')
  @UseGuards(OrganizationMemberGuard, OrganizationRoleGuard)
  @Roles(OrganizationRole.OWNER, OrganizationRole.ADMIN)
  @ApiOperation({ summary: 'Update organization' })
  @ApiResponse({
    status: 200,
    description: 'Organization updated successfully.',
  })
  @ApiResponse({ status: 403, description: 'Insufficient permissions.' })
  @ApiResponse({ status: 404, description: 'Organization not found.' })
  async updateOrganization(
    @Param('organizationId') organizationId: string,
    @Body() dto: UpdateOrganizationDto,
  ) {
    return this.organizationService.updateOrganization(organizationId, dto);
  }

  @Delete(':organizationId')
  @UseGuards(OrganizationMemberGuard, OrganizationRoleGuard)
  @Roles(OrganizationRole.OWNER)
  @ApiOperation({ summary: 'Delete organization' })
  @ApiResponse({
    status: 200,
    description: 'Organization deleted successfully.',
  })
  @ApiResponse({
    status: 403,
    description: 'Only the owner can delete the organization.',
  })
  @ApiResponse({ status: 404, description: 'Organization not found.' })
  async deleteOrganization(@Param('organizationId') organizationId: string) {
    return this.organizationService.deleteOrganization(organizationId);
  }

  @Post('invitations/decline')
  @Public()
  @ApiOperation({ summary: 'Decline an organization invitation' })
  @ApiResponse({
    status: 200,
    description: 'Invitation declined successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid or expired invitation token.',
  })
  async declineInvitation(@Body() dto: DeclineInvitationDto) {
    return this.organizationService.declineInvitation(dto.token);
  }
}

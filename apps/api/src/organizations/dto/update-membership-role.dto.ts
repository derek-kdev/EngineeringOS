import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrganizationRole } from '../constants/roles';

export class UpdateMembershipRoleDto {
  @IsEnum(OrganizationRole)
  @IsNotEmpty()
  role!: OrganizationRole;
}

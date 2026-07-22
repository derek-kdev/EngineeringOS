import { IsOptional, IsString, IsUrl, IsObject } from 'class-validator';
import { OrganizationRole, DateFormat, TimeFormat } from '@prisma/client';

export class UpdateOrganizationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  industry?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsObject()
  settings?: {
    timezone?: string;
    currency?: string;
    defaultRole?: OrganizationRole;
    dateFormat?: DateFormat;
    timeFormat?: TimeFormat;
    weekStartsOn?: number;
    allowGuestAccess?: boolean;
    metadata?: Record<string, any>;
  };
}

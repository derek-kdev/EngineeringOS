import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty({
    description: 'Unique user identifier',
    example: 'c4e4d6d5-8e8d-4c8d-8b72-0d9f7b6a1234',
    format: 'uuid',
  })
  id!: string;

  @ApiProperty({
    description: 'User email address',
    example: 'engineeringos@dev.com',
    format: 'email',
  })
  email!: string;

  @ApiProperty({
    description: 'User first name',
    example: 'EngineeringOS',
    maxLength: 100,
  })
  firstName!: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Dev',
    maxLength: 100,
  })
  lastName!: string;

  @ApiProperty({
    description: 'User display name',
    example: 'EngineeringOS Dev',
  })
  displayName!: string | null;

  @ApiPropertyOptional({
    description: 'URL to the user profile avatar',
    example: 'https://cdn.example.com/avatars/engineeringos-dev.png',
    format: 'uri',
  })
  avatarUrl?: string | null;

  @ApiPropertyOptional({
    description: 'User phone number',
    example: '+233591765036',
  })
  phone?: string | null;

  @ApiPropertyOptional({
    description: 'User job title',
    example: 'Software Engineer',
  })
  jobTitle?: string | null;

  @ApiPropertyOptional({
    description: 'User locale',
    example: 'en-US',
  })
  locale?: string;

  @ApiPropertyOptional({
    description: 'User timezone',
    example: 'UTC',
  })
  timezone?: string;

  @ApiProperty({
    description: 'Whether the user account is active',
    example: true,
  })
  isActive!: boolean;

  @ApiPropertyOptional({
    description: 'Timestamp when the user email was verified',
    example: '2026-07-14T10:30:00.000Z',
    format: 'date-time',
  })
  emailVerifiedAt?: Date | null;

  @ApiPropertyOptional({
    description: "Timestamp of the user's last successful login",
    example: '2026-07-14T14:15:22.000Z',
    format: 'date-time',
  })
  lastLoginAt?: Date | null;

  @ApiProperty({
    description: 'Timestamp when the user was created',
    example: '2026-01-10T08:00:00.000Z',
    format: 'date-time',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Timestamp when the user was last updated',
    example: '2026-07-14T14:15:22.000Z',
    format: 'date-time',
  })
  updatedAt!: Date;

  /*@ApiPropertyOptional({
    description: 'Timestamp when the user was soft deleted',
    example: '2026-08-01T09:00:00.000Z',
    format: 'date-time',
  })
  deletedAt?: Date;
*/
}

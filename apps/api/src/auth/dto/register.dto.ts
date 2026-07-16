/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsOptional,
  IsObject,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class OrganizationDto {
  @ApiPropertyOptional({
    description: 'Create a new organization during user registration(Optional)',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  create?: boolean;

  @ApiPropertyOptional({
    description: 'Organization name',
    example: 'EngineeringOS Dev',
    minLength: 2,
    maxLength: 120,
  })
  @IsOptional()
  @IsString()
  @Length(2, 120)
  name?: string;

  @ApiPropertyOptional({
    description: 'Unique organization slug',
    example: 'engineeringos-dev',
    minLength: 2,
    maxLength: 120,
  })
  @IsOptional()
  @IsString()
  @Length(2, 120)
  slug?: string;
}

export class RegisterDto {
  @ApiProperty({
    description: 'User email',
    example: 'engineeringos@dev.com',
    maxLength: 100,
  })
  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsNotEmpty()
  @IsEmail()
  @Length(5, 255)
  email!: string; // added !

  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @Length(8, 128)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}\-_=+|;:'",.<>/~`\\]).+$/,
    {
      message:
        'Password must contain at least one uppercase, one lowercase, one number, and one special character.',
    },
  )
  password!: string;

  @ApiProperty({
    description: 'User first name',
    example: 'EngineeringOS',
    maxLength: 100,
  })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  firstName!: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Dev',
    maxLength: 100,
  })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  lastName!: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => OrganizationDto)
  organization?: OrganizationDto;

  @ApiPropertyOptional({
    description:
      'Override the global SEND_VERIFICATION_EMAIL_ON_REGISTER setting. If true, sends the verification email; if false, skips it.',
    example: true,
    default: process.env.SEND_VERIFICATION_EMAIL_ON_REGISTER !== 'false',
  })
  @IsOptional()
  @IsBoolean()
  sendVerificationEmail?: boolean;
}

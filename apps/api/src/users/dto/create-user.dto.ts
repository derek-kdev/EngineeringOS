import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
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
  @MinLength(2)
  @MaxLength(120)
  name?: string;

  @ApiPropertyOptional({
    description: 'Unique organization slug',
    example: 'acme-corp',
    minLength: 2,
    maxLength: 120,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  slug?: string;
}

export class CreateUserDto {
  @ApiProperty({
    description: 'User first name',
    example: 'John',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName!: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName!: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
    format: 'email',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description:
      'Hashed password (e.g. Argon2 or bcrypt hash). This field is intended for internal service use.',
    example: '$argon2id$v=19$m=65536,t=3,p=4$h8mWQ4yQjv1...R5w',
    minLength: 20,
  })
  @IsString()
  @MinLength(20)
  passwordHash!: string;

  @ApiPropertyOptional({
    description: 'Organization information for the user',
    type: () => OrganizationDto,
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => OrganizationDto)
  organization?: OrganizationDto;
}

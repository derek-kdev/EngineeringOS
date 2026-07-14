/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'User email address.',
    example: 'engineeringos@dev.com',
    format: 'email',
    minLength: 5,
    maxLength: 255,
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsNotEmpty({
    message: 'Email is required.',
  })
  @IsEmail(
    {},
    {
      message: 'Please provide a valid email address.',
    },
  )
  @Length(5, 255, {
    message: 'Email must be between 5 and 255 characters.',
  })
  email!: string;

  @ApiProperty({
    description: 'User account password.',
    example: 'MySecurePassword123!',
    minLength: 8,
    maxLength: 128,
    format: 'password',
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({
    message: 'Password is required.',
  })
  @IsString({
    message: 'Password must be a string.',
  })
  @Length(8, 128, {
    message: 'Password must be between 8 and 128 characters.',
  })
  password!: string;
}

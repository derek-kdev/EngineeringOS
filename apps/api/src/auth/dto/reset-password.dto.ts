/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Transform } from 'class-transformer';
import { IsJWT, IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Password reset token received via email.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjdWlkMTIzNDUiLCJ0eXBlIjoicGFzc3dvcmRfcmVzZXQiLCJpYXQiOjE3MTgwMDAwMDAsImV4cCI6MTcxODAwMDkwMH0.signature',
    format: 'jwt',
  })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({
    message: 'Reset token is required.',
  })
  @IsJWT({
    message: 'Reset token must be a valid JWT.',
  })
  token!: string;

  @ApiProperty({
    description:
      'New password. Must be 12–128 characters and include uppercase, lowercase, a number, and a special character.',
    example: 'MySecureP@ssw0rd!',
    format: 'password',
    minLength: 12,
    maxLength: 128,
  })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({
    message: 'New password is required.',
  })
  @Length(12, 128, {
    message: 'Password must be between 12 and 128 characters.',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}\-_=+|;:'",.<>/~`\\]).+$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  password!: string;
}

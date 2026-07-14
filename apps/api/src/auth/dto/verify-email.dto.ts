/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({
    description: 'Email address to send the verification email to.',
    example: 'engineeringos@dev.com',
    format: 'email',
    minLength: 5,
    maxLength: 255,
  })
  @IsEmail(
    {},
    {
      message: 'Please provide a valid email address.',
    },
  )
  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsNotEmpty({
    message: 'Email is required.',
  })
  @Length(5, 255, {
    message: 'Email must be between 5 and 255 characters.',
  })
  email!: string;
}

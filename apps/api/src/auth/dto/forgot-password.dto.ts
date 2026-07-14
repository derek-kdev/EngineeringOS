/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Email address associated with the user account.',
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
}

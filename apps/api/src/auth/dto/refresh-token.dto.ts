/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Transform } from 'class-transformer';
import { IsJWT, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'JWT refresh token used to obtain a new access token.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjdWlkMTIzNDUiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE4MDAwMDAwLCJleHAiOjE3MTg2MDQ4MDB9.signature',
    format: 'jwt',
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({
    message: 'Refresh token is required.',
  })
  @IsJWT({
    message: 'Refresh token must be a valid JWT.',
  })
  refreshToken!: string;
}

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import {
  ForgotPasswordDto,
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
  ResetPasswordDto,
  VerifyEmailDto,
} from '../auth/dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  register(dto: RegisterDto) {
    void dto;
    return {
      message: 'Register placeholder',
    };
  }

  login(dto: LoginDto) {
    void dto;
    return {
      message: 'Login placeholder',
    };
  }

  refresh(dto: RefreshTokenDto) {
    void dto;
    return {
      message: 'Refresh placeholder',
    };
  }

  logout() {
    return {
      message: 'Logout placeholder',
    };
  }

  forgotPassword(dto: ForgotPasswordDto) {
    void dto;
    return {
      message: 'Forgot password placeholder',
    };
  }

  resetPassword(dto: ResetPasswordDto) {
    void dto;
    return {
      message: 'Reset password placeholder',
    };
  }

  verifyEmail(dto: VerifyEmailDto) {
    void dto;
    return {
      message: 'Verify email placeholder',
    };
  }

  verifyEmailToken(token: string) {
    void token;
    return {
      message: 'Verify email token placeholder',
    };
  }
}

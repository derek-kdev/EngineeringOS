import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/user.module';
import { SessionsModule } from '../sessions/sessions.module';
import { PasswordService } from '../common/security/password.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    UsersModule,
    SessionsModule, // added
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          expiresIn: (configService.get<string>('JWT_ACCESS_EXPIRES_IN') ||
            '15m') as any,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}

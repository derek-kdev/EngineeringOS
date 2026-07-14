import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { UserMapper } from './mappers/user.mapper';

@Module({
  imports: [PrismaModule],

  controllers: [UsersController],

  providers: [UsersService, UserMapper],

  exports: [UsersService],
})
export class UsersModule {}

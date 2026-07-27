import { Module, forwardRef } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

import { SearchModule } from '../search/search.module';


@Module({
  imports: [
    PrismaModule,
    forwardRef(() => SearchModule),
  ],

  controllers: [
    OrganizationController,
  ],

  providers: [
    OrganizationService,
  ],

  exports: [
    OrganizationService,
  ],
})
export class OrganizationModule {}

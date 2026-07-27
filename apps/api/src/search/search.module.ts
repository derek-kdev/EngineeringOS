import { Module, forwardRef } from '@nestjs/common';

import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SearchIndexService } from './search-index.service';

import { PrismaModule } from '../prisma/prisma.module';
import { OrganizationModule } from '../organizations/organization.module';


@Module({
  imports: [
    PrismaModule,
    forwardRef(() => OrganizationModule),
  ],

  controllers: [
    SearchController,
  ],

  providers: [
    SearchService,
    SearchIndexService,
  ],

  exports: [
    SearchService,
    SearchIndexService,
  ],
})
export class SearchModule {}

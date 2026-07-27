import { Module } from '@nestjs/common';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';
import { MaterialsRepository } from './materials.repository';

@Module({
  controllers: [MaterialsController],
  providers: [
    MaterialsService,
    MaterialsRepository,
  ],
  exports: [
    MaterialsService,
  ],
})
export class MaterialsModule {}

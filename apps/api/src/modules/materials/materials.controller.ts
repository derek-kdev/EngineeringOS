import { Controller, Get, Param, Query } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialQueryDto } from './dto/material-query.dto';

@Controller('materials')
export class MaterialsController {
  constructor(
    private readonly materialsService: MaterialsService,
  ) {}

  @Get()
  async findAll(
    @Query() query: MaterialQueryDto,
  ) {
    if (query.search) {
      return this.materialsService.search(query.search);
    }

    return this.materialsService.findAll();
  }

  @Get('categories')
  async categories() {
    return this.materialsService.categories();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ) {
    return this.materialsService.findOne(id);
  }
}

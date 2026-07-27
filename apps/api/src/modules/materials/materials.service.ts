import { Injectable } from '@nestjs/common';
import { MaterialsRepository } from './materials.repository';

@Injectable()
export class MaterialsService {
  constructor(
    private readonly materialsRepository: MaterialsRepository,
  ) {}

  async findAll() {
    return this.materialsRepository.findAll();
  }

  async findOne(id: string) {
    return this.materialsRepository.findById(id);
  }

  async search(query: string) {
    return this.materialsRepository.search(query);
  }

  async categories() {
    const results = await this.materialsRepository.findCategories();

    return results.map(
      (item) => item.category,
    );
  }
}

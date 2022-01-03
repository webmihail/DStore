import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { SubcategoryCreateDTO } from './dtos/subcategory.create.dto';
import { SubcategoryDTO } from './dtos/subcategory.dto';
import { SubcategoryEditDTO } from './dtos/subcategory.edit.dto';
import { Subcategory } from './entity/subcategory.entity';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
  ) {}

  async getAll(): Promise<SubcategoryDTO[]> {
    return await this.subcategoryRepository.find();
  }

  async getById(id: string): Promise<SubcategoryDTO> {
    return await this.subcategoryRepository.findOne(id);
  }

  async create(data: SubcategoryCreateDTO): Promise<SubcategoryDTO> {
    const newSubcategory = await this.subcategoryRepository.create(data);
    return await this.subcategoryRepository.save(newSubcategory);
  }

  async update(id: string, data: SubcategoryEditDTO): Promise<SubcategoryDTO> {
    const subcategory = await this.getById(id);
    const editSubcategory = Object.assign(subcategory, data);
    return await this.subcategoryRepository.save(editSubcategory);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.subcategoryRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CategoryCreateDTO } from './dtos/category.create.dto';
import { CategoryDTO } from './dtos/category.dto';
import { CategoryEditDTO } from './dtos/category.edit.dto';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAll(): Promise<CategoryDTO[]> {
    return await this.categoryRepository.find();
  }

  async getById(id: string): Promise<CategoryDTO> {
    return await this.categoryRepository.findOne(id);
  }

  async create(data: CategoryCreateDTO): Promise<CategoryDTO> {
    const newCategory = await this.categoryRepository.create(data);
    return await this.categoryRepository.save(newCategory);
  }

  async update(id: string, data: CategoryEditDTO): Promise<CategoryDTO> {
    const category = await this.getById(id);
    const editCategory = Object.assign(category, data);
    return await this.categoryRepository.save(editCategory);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.categoryRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubcategoryService } from 'src/subcategory/subcategory.service';
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
    private readonly subcategoryService: SubcategoryService,
  ) {}

  async getAll(): Promise<CategoryDTO[]> {
    return await this.categoryRepository.find({
      relations: ['subcategories'],
    });
  }

  async getById(id: string): Promise<CategoryDTO> {
    return await this.categoryRepository.findOne(id, {
      relations: ['subcategories'],
    });
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

  async addSubcategory(
    categoryId: string,
    subcategoryId: string,
  ): Promise<CategoryDTO> {
    const category = await this.getById(categoryId);
    const equalSubcategories = category.subcategories.filter(
      (subcategory) => subcategory.id === subcategoryId,
    );

    if (equalSubcategories.length === 0) {
      const subcategory = await this.subcategoryService.getById(subcategoryId);
      category.subcategories.push(subcategory);
    }

    const editCategory = await this.categoryRepository.save(category);

    return editCategory;
  }

  async deleteSubcategory(
    categoryId: string,
    subcategoryId: string,
  ): Promise<CategoryDTO> {
    const category = await this.getById(categoryId);
    const editSubcategory = category.subcategories.filter(
      (subcategory) => subcategory.id !== subcategoryId,
    );

    category.subcategories = editSubcategory;
    const editCategory = await this.categoryRepository.save(category);

    return editCategory;
  }
}

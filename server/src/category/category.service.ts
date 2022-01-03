import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getManager, TreeRepository } from 'typeorm';
import { CategoryCreateDTO } from './dtos/category.create.dto';
import { CategoryDTO } from './dtos/category.dto';
import { CategoryEditDTO } from './dtos/category.edit.dto';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryTreeRepository: TreeRepository<Category> = getManager().getTreeRepository(
      Category,
    ),
  ) {}

  async getAll(): Promise<CategoryDTO[]> {
    return await this.categoryTreeRepository.findTrees({ depth: 2 });
  }

  async getById(id: string): Promise<Category> {
    return await this.categoryTreeRepository.findOne(id);
  }

  async create(data: CategoryCreateDTO): Promise<CategoryDTO> {
    const category = new Category();
    category.name = data.name;
    category.iconUrl = data.iconUrl;
    return await this.categoryTreeRepository.save(category);
  }

  async createSubcategory(
    categoryId: string,
    data: CategoryCreateDTO,
  ): Promise<Category> {
    const newSubcategory = new Category();
    const category = await this.getById(categoryId);
    newSubcategory.name = data.name;
    newSubcategory.iconUrl = data.iconUrl;
    newSubcategory.parent = category;

    return await this.categoryTreeRepository.save(newSubcategory);
  }

  async update(id: string, data: CategoryEditDTO): Promise<CategoryDTO> {
    const category = await this.getById(id);
    const editCategory = Object.assign(category, data);
    return await this.categoryTreeRepository.save(editCategory);
  }

  async delete(id: string): Promise<DeleteResult> {
    try {
      return await this.categoryTreeRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(
        'Ви не можете видалити категорію! Спочатку треба видалити усі підкатегорії з цієї категорії',
      );
    }
  }
}

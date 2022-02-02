import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileManagerService } from 'src/fileManager/fileManager.service';
import { DeleteResult, getManager, TreeRepository } from 'typeorm';
import { CategoryCreateDTO } from './dtos/category.create.dto';
import { CategoryEditDTO } from './dtos/category.edit.dto';
import { CategoryEntity } from './entity/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryTreeRepository: TreeRepository<CategoryEntity> = getManager().getTreeRepository(
      CategoryEntity,
    ),
    private readonly fileManagerService: FileManagerService,
  ) {}

  async getAll(): Promise<CategoryEntity[]> {
    const categoriesList = await this.categoryTreeRepository.findTrees({
      depth: 2,
      relations: ['products', 'image'],
    });

    const responseWithDeletions = categoriesList.map((category) => {
      if (category.children.length !== 0) delete category.products;
      category.children.map((child) => {
        if (child.children.length === 0) delete child.children;
        return child;
      });
      return category;
    });

    return responseWithDeletions;
  }

  async getById(id: string): Promise<CategoryEntity> {
    const category = await this.categoryTreeRepository.findOne(id, {
      relations: ['children', 'products', 'productTypes', 'image'],
    });

    if (category.children.length !== 0 && category.products.length === 0) {
      delete category.products;
    }

    if (category.children.length === 0) delete category.children;

    return category;
  }

  async create(data: CategoryCreateDTO): Promise<CategoryEntity> {
    const category = new CategoryEntity();
    category.name = data.name;
    return await this.categoryTreeRepository.save(category);
  }

  async createSubcategory(
    categoryId: string,
    data: CategoryCreateDTO,
  ): Promise<CategoryEntity> {
    const newSubcategory = new CategoryEntity();
    const category = await this.getById(categoryId);
    newSubcategory.name = data.name;
    newSubcategory.parent = category;

    return await this.categoryTreeRepository.save(newSubcategory);
  }

  async update(id: string, data: CategoryEditDTO): Promise<CategoryEntity> {
    const category = await this.getById(id);
    const editCategory = Object.assign(category, data);
    return await this.categoryTreeRepository.save(editCategory);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.categoryTreeRepository.delete(id);
  }

  async addImage(categoryId: string, imageBuffer: Buffer, filename: string) {
    const image = await this.fileManagerService.uploadPublicFile(
      imageBuffer,
      filename,
    );
    const category = await this.getById(categoryId);
    category.image = image;

    return await this.categoryTreeRepository.save(category);
  }

  async deleteImage(categoryId: string, imageId: string) {
    const category = await this.getById(categoryId);
    category.image = null;

    await this.fileManagerService.deletePublicFile(imageId);
    return await this.categoryTreeRepository.save(category);
  }
}

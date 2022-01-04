import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { DeleteResult, getManager, TreeRepository } from 'typeorm';
import { CategoryCreateDTO } from './dtos/category.create.dto';
import { CategoryDTO } from './dtos/category.dto';
import { CategoryEditDTO } from './dtos/category.edit.dto';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryTreeRepository: TreeRepository<Category> = getManager().getTreeRepository(
      Category,
    ),
    private readonly productsService: ProductsService,
  ) {}

  async getAll(): Promise<CategoryDTO[]> {
    return await this.categoryTreeRepository.findTrees({
      depth: 2,
      relations: ['products'],
    });
  }

  async getById(id: string): Promise<Category> {
    return await this.categoryTreeRepository.findOne(id, {
      relations: ['products'],
    });
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
    return await this.categoryTreeRepository.delete(id);
  }

  async addProduct(
    categoryId: string,
    productId: string,
  ): Promise<CategoryDTO> {
    const category = await this.getById(categoryId);
    const equalProduct = category.products.filter(
      (product) => product.id === productId,
    );

    if (equalProduct.length === 0) {
      const product = await this.productsService.getById(productId);
      category.products.push(product);
    }

    const editCategory = await this.categoryTreeRepository.save(category);

    return editCategory;
  }

  async deleteProduct(
    categoryId: string,
    productId: string,
  ): Promise<CategoryDTO> {
    const category = await this.getById(categoryId);
    const editProducts = category.products.filter(
      (product) => product.id !== productId,
    );

    category.products = editProducts;

    const editCategory = await this.categoryTreeRepository.save(category);

    return editCategory;
  }
}

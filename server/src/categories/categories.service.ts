import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCreateDTO } from 'src/products/dtos/product.create.dto';
import { ProductsService } from 'src/products/products.service';
import { ProductTypeCreateDTO } from 'src/productTypes/dtos/productType.create.dto';
import { ProductTypesService } from 'src/productTypes/productTypes.service';
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
    private readonly productTypesService: ProductTypesService,
  ) {}

  async getAll(): Promise<CategoryDTO[]> {
    const categoriesList = await this.categoryTreeRepository.findTrees({
      depth: 2,
      relations: ['products'],
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

  async getById(id: string): Promise<Category> {
    const category = await this.categoryTreeRepository.findOne(id, {
      relations: ['children', 'products', 'productTypes'],
    });

    if (category.children.length !== 0 && category.products.length === 0) {
      delete category.products;
    }

    if (category.children.length === 0) delete category.children;

    delete category.productTypes;

    return category;
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

  async createProductToCategory(
    id: string,
    data: ProductCreateDTO,
  ): Promise<CategoryDTO> {
    const category = await this.getById(id);
    const newProduct = await this.productsService.create(data);

    const equalProduct = category.products.filter(
      (product) => product.name === newProduct.name,
    );

    if (equalProduct.length === 0) {
      category.products.push(newProduct);
    }

    const editCategory = await this.categoryTreeRepository.save(category);

    return editCategory;
  }

  async createProductTypeToCategory(
    id: string,
    data: ProductTypeCreateDTO,
  ): Promise<CategoryDTO> {
    const category = await this.getById(id);
    const newProductType = await this.productTypesService.create(data);

    const equalProductType = category.productTypes.filter(
      (productType) => productType.name === newProductType.name,
    );

    if (equalProductType.length === 0) {
      category.productTypes.push(newProductType);
    }

    const editCategory = await this.categoryTreeRepository.save(category);

    delete editCategory.productTypes;

    return editCategory;
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

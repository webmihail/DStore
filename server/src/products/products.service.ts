import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandsService } from 'src/brands/brands.service';
import { ProductTypesService } from 'src/productTypes/productTypes.service';
import { DeleteResult, Repository } from 'typeorm';
import { ProductCreateDTO } from './dtos/product.create.dto';
import { ProductEditDTO } from './dtos/product.edit.dto';
import { ProductEntity } from './entity/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
    private readonly productTypesService: ProductTypesService,
    private readonly brandsService: BrandsService,
  ) {}

  async getAll(): Promise<ProductEntity[]> {
    return await this.productsRepository.find({
      relations: ['productType', 'brand'],
    });
  }

  async getById(id: string): Promise<ProductEntity> {
    return await this.productsRepository.findOne(id, {
      relations: ['productType', 'brand'],
    });
  }

  async create(data: ProductCreateDTO): Promise<ProductEntity> {
    const newProduct = await this.productsRepository.create(data);
    return await this.productsRepository.save(newProduct);
  }

  async update(id: string, data: ProductEditDTO): Promise<ProductEntity> {
    const product = await this.getById(id);
    const editProduct = Object.assign(product, data);
    return await this.productsRepository.save(editProduct);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.productsRepository.delete(id);
  }

  async addProductType(
    productId: string,
    productTypeId: string,
  ): Promise<ProductEntity> {
    const product = await this.getById(productId);
    const productType = await this.productTypesService.getById(productTypeId);
    product.productType = productType;
    const editCategory = await this.productsRepository.save(product);

    return editCategory;
  }

  async deleteProductType(productId: string): Promise<ProductEntity> {
    const product = await this.getById(productId);
    product.productType = null;
    const editCategory = await this.productsRepository.save(product);

    return editCategory;
  }

  async addBrand(productId: string, brandId: string): Promise<ProductEntity> {
    const product = await this.getById(productId);
    const brand = await this.brandsService.getById(brandId);
    product.brand = brand;
    const editCategory = await this.productsRepository.save(product);

    return editCategory;
  }

  async deleteBrand(productId: string): Promise<ProductEntity> {
    const product = await this.getById(productId);
    product.brand = null;
    const editCategory = await this.productsRepository.save(product);

    return editCategory;
  }
}

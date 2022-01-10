import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandsService } from 'src/brands/brands.service';
import { ProductTypesService } from 'src/productTypes/productTypes.service';
import { DeleteResult, Repository } from 'typeorm';
import { ProductCreateDTO } from './dtos/product.create.dto';
import { ProductDTO } from './dtos/product.dto';
import { ProductEditDTO } from './dtos/product.edit.dto';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly productTypesService: ProductTypesService,
    private readonly brandsService: BrandsService,
  ) {}

  async getAll(): Promise<ProductDTO[]> {
    return await this.productsRepository.find({
      relations: ['productType', 'brand'],
    });
  }

  async getById(id: string): Promise<Product> {
    return await this.productsRepository.findOne(id, {
      relations: ['productType', 'brand'],
    });
  }

  async create(data: ProductCreateDTO): Promise<ProductDTO> {
    const newProduct = await this.productsRepository.create(data);
    return await this.productsRepository.save(newProduct);
  }

  async update(id: string, data: ProductEditDTO): Promise<ProductDTO> {
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
  ): Promise<ProductDTO> {
    const product = await this.getById(productId);
    const productType = await this.productTypesService.getById(productTypeId);
    product.productType = productType;
    const editCategory = await this.productsRepository.save(product);

    return editCategory;
  }

  async deleteProductType(productId: string): Promise<ProductDTO> {
    const product = await this.getById(productId);
    product.productType = null;
    const editCategory = await this.productsRepository.save(product);

    return editCategory;
  }

  async addBrand(productId: string, brandId: string): Promise<ProductDTO> {
    const product = await this.getById(productId);
    const brand = await this.brandsService.getById(brandId);
    product.brand = brand;
    const editCategory = await this.productsRepository.save(product);

    return editCategory;
  }

  async deleteBrand(productId: string): Promise<ProductDTO> {
    const product = await this.getById(productId);
    product.brand = null;
    const editCategory = await this.productsRepository.save(product);

    return editCategory;
  }
}

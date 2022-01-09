import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  async getAll(): Promise<ProductDTO[]> {
    return await this.productsRepository.find({ relations: ['productType'] });
  }

  async getById(id: string): Promise<Product> {
    return await this.productsRepository.findOne(id);
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
}

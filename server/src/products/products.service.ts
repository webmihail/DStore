import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  async getAll(): Promise<ProductDTO[]> {
    return await this.productsRepository.find();
  }

  async getById(id: string): Promise<ProductDTO> {
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
}

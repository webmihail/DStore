import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ProductTypeCreateDTO } from './dtos/productType.create.dto';
import { ProductTypeEditDTO } from './dtos/productType.edit.dto';
import { ProductTypeEntity } from './entity/productType.entity';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectRepository(ProductTypeEntity)
    private readonly productTypeRepository: Repository<ProductTypeEntity>,
  ) {}

  async getAll(): Promise<ProductTypeEntity[]> {
    return await this.productTypeRepository.find();
  }

  async getAllByCategoryId(categoryId: string): Promise<ProductTypeEntity[]> {
    return await this.productTypeRepository.find({
      where: {
        category: {
          id: categoryId,
        },
      },
    });
  }

  async getById(id: string): Promise<ProductTypeEntity> {
    return await this.productTypeRepository.findOne(id);
  }

  async create(data: ProductTypeCreateDTO): Promise<ProductTypeEntity> {
    const newProductType = await this.productTypeRepository.create(data);
    return await this.productTypeRepository.save(newProductType);
  }

  async update(
    id: string,
    data: ProductTypeEditDTO,
  ): Promise<ProductTypeEntity> {
    const productType = await this.getById(id);
    const editProductType = Object.assign(productType, data);
    return await this.productTypeRepository.save(editProductType);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.productTypeRepository.delete(id);
  }
}

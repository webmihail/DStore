import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ProductInfoCreateDTO } from './dtos/productInfo.create.dto';
import { ProductInfoEditDTO } from './dtos/productInfo.edit.dto';
import { ProductInfoEntity } from './entity/productInfo.entity';

@Injectable()
export class ProductsInfoService {
  constructor(
    @InjectRepository(ProductInfoEntity)
    private readonly productInfoRepository: Repository<ProductInfoEntity>,
  ) {}

  async getById(id: string): Promise<ProductInfoEntity> {
    return await this.productInfoRepository.findOne(id);
  }

  async create(data: ProductInfoCreateDTO): Promise<ProductInfoEntity> {
    const newProductInfo = await this.productInfoRepository.create(data);
    return await this.productInfoRepository.save(newProductInfo);
  }

  async update(
    id: string,
    data: ProductInfoEditDTO,
  ): Promise<ProductInfoEntity> {
    const productInfo = await this.getById(id);
    const editProductInfo = Object.assign(productInfo, data);
    return await this.productInfoRepository.save(editProductInfo);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.productInfoRepository.delete(id);
  }
}

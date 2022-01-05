import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { DeleteResult, Repository } from 'typeorm';
import { ProductTypeCreateDTO } from './dtos/productType.create.dto';
import { ProductTypeDTO } from './dtos/productType.dto';
import { ProductTypeEditDTO } from './dtos/productType.edit.dto';
import { ProductType } from './entity/productType.entity';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectRepository(ProductType)
    private readonly productTypeRepository: Repository<ProductType>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async getAll(): Promise<ProductTypeDTO[]> {
    return await this.productTypeRepository.find({ relations: ['category'] });
  }

  async getAllByCategoryId(categoryId: string): Promise<ProductTypeDTO[]> {
    return await this.productTypeRepository.find({
      where: {
        category: {
          id: categoryId,
        },
      },
    });
  }

  async getById(id: string): Promise<ProductTypeDTO> {
    return await this.productTypeRepository.findOne(id);
  }

  async create(
    categoryId: string,
    data: ProductTypeCreateDTO,
  ): Promise<ProductTypeDTO> {
    const category = await this.categoriesService.getById(categoryId);
    const productType = await this.productTypeRepository.create(data);
    productType.category = category;
    const newProductType = await this.productTypeRepository.save(productType);
    delete newProductType.category;
    return newProductType;
  }

  async update(id: string, data: ProductTypeEditDTO): Promise<ProductTypeDTO> {
    const productType = await this.getById(id);
    const editProductType = Object.assign(productType, data);
    return await this.productTypeRepository.save(editProductType);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.productTypeRepository.delete(id);
  }
}

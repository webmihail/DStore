import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { DeleteResult, Repository } from 'typeorm';
import { ProductTypeCreateDTO } from './dtos/productType.create.dto';
import { ProductTypeEditDTO } from './dtos/productType.edit.dto';
import { ProductTypeEntity } from './entity/productType.entity';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectRepository(ProductTypeEntity)
    private readonly productTypeRepository: Repository<ProductTypeEntity>,
    private readonly categoriesService: CategoriesService,
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

  async create(
    categoryId: string,
    data: ProductTypeCreateDTO,
  ): Promise<ProductTypeEntity> {
    const category = await this.categoriesService.getById(categoryId);
    const newProductType = await this.productTypeRepository.create(data);

    const equalProductType = category.productTypes.filter(
      (productType) => productType.name === newProductType.name,
    );

    if (equalProductType.length !== 0)
      throw new BadRequestException(
        'Тип продукту з такою назвою існує у категорії',
      );

    newProductType.category = category;

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

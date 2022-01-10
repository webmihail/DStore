import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { BrandDTO } from './dtos/brand.dto';
import { BrandEditDTO } from './dtos/brand.edit.dto';
import { BrandCreateDTO } from './dtos/brend.create.dto';
import { Brand } from './entity/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async getAll(): Promise<BrandDTO[]> {
    return await this.brandRepository.find();
  }

  async getById(id: string): Promise<BrandDTO> {
    return await this.brandRepository.findOne(id);
  }

  async create(data: BrandCreateDTO): Promise<BrandDTO> {
    const newBrand = await this.brandRepository.create(data);
    return await this.brandRepository.save(newBrand);
  }

  async update(id: string, data: BrandEditDTO): Promise<BrandDTO> {
    const brand = await this.getById(id);
    const editBrand = Object.assign(brand, data);
    return await this.brandRepository.save(editBrand);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.brandRepository.delete(id);
  }
}

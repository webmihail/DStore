import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { SaleCreateDTO } from './dtos/sale.create.dto';
import { SaleEditDTO } from './dtos/sale.edit.dto';
import { SaleEntity } from './entity/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
  ) {}

  async getAll(): Promise<SaleEntity[]> {
    return await this.saleRepository.find();
  }

  async getById(id: string): Promise<SaleEntity> {
    return await this.saleRepository.findOne(id);
  }

  async create(data: SaleCreateDTO): Promise<SaleEntity> {
    const newSale = await this.saleRepository.create(data);
    return await this.saleRepository.save(newSale);
  }

  async update(id: string, data: SaleEditDTO): Promise<SaleEntity> {
    const sale = await this.getById(id);
    const editSale = Object.assign(sale, data);
    return await this.saleRepository.save(editSale);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.saleRepository.delete(id);
  }
}

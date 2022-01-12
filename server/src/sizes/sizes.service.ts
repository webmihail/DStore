import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { SizeCreateDTO } from './dtos/size.create.dto';
import { SizeEditDTO } from './dtos/size.edit.dto';
import { SizeEntity } from './entity/size.entity';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(SizeEntity)
    private readonly sizeRepository: Repository<SizeEntity>,
  ) {}

  async getAll(): Promise<SizeEntity[]> {
    return await this.sizeRepository.find();
  }

  async getById(id: string): Promise<SizeEntity> {
    return await this.sizeRepository.findOne(id);
  }

  async create(data: SizeCreateDTO): Promise<SizeEntity> {
    const newSize = await this.sizeRepository.create(data);
    return await this.sizeRepository.save(newSize);
  }

  async update(id: string, data: SizeEditDTO): Promise<SizeEntity> {
    const size = await this.getById(id);
    const editSize = Object.assign(size, data);
    return await this.sizeRepository.save(editSize);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.sizeRepository.delete(id);
  }
}

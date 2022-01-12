import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ColorCreateDTO } from './dtos/color.create.dto';
import { ColorEditDTO } from './dtos/color.edit.dto';
import { ColorEntity } from './entity/color.entity';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(ColorEntity)
    private readonly colorRepository: Repository<ColorEntity>,
  ) {}

  async getAll(): Promise<ColorEntity[]> {
    return await this.colorRepository.find();
  }

  async getById(id: string): Promise<ColorEntity> {
    return await this.colorRepository.findOne(id);
  }

  async create(data: ColorCreateDTO): Promise<ColorEntity> {
    const newColor = await this.colorRepository.create(data);
    return await this.colorRepository.save(newColor);
  }

  async update(id: string, data: ColorEditDTO): Promise<ColorEntity> {
    const color = await this.getById(id);
    const editColor = Object.assign(color, data);
    return await this.colorRepository.save(editColor);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.colorRepository.delete(id);
  }
}

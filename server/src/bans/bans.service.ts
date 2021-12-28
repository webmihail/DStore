import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { BanCreateDTO } from './dtos/ban.create.dto';
import { BanDTO } from './dtos/ban.dto';
import { BanEditDTO } from './dtos/ban.edit.dto';
import { Ban } from './entity/ban.entity';

@Injectable()
export class BansService {
  constructor(
    @InjectRepository(Ban)
    private readonly banRepository: Repository<Ban>,
  ) {}

  async getAll(): Promise<BanDTO[]> {
    return await this.banRepository.find();
  }

  async getById(id: string): Promise<BanDTO> {
    return await this.banRepository.findOne(id);
  }

  async create(data: BanCreateDTO): Promise<BanDTO> {
    const newBan = await this.banRepository.create(data);
    return await this.banRepository.save(newBan);
  }

  async update(id: string, data: BanEditDTO): Promise<BanDTO> {
    const ban = await this.getById(id);
    const editBan = Object.assign(ban, data);
    return await this.banRepository.save(editBan);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.banRepository.delete(id);
  }

  async changeBanStatus(id: string): Promise<BanDTO> {
    const ban = await this.getById(id);
    ban.isBanned = !ban.isBanned;
    return await this.banRepository.save(ban);
  }
}

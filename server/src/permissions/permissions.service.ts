import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { PermissionCreateDTO } from './dtos/permission.create.dto';
import { PermissionEditDTO } from './dtos/permission.edit.dto';
import { PermissionEntity } from './entity/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionsRepository: Repository<PermissionEntity>,
  ) {}

  async getAll(): Promise<PermissionEntity[]> {
    return await this.permissionsRepository.find();
  }

  async getById(id: string): Promise<PermissionEntity> {
    return await this.permissionsRepository.findOne(id);
  }

  async create(data: PermissionCreateDTO): Promise<PermissionEntity> {
    const newPremission = await this.permissionsRepository.create(data);
    return await this.permissionsRepository.save(newPremission);
  }

  async update(id: string, data: PermissionEditDTO): Promise<PermissionEntity> {
    const premission = await this.getById(id);
    const editPremission = Object.assign(premission, data);
    return await this.permissionsRepository.save(editPremission);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.permissionsRepository.delete(id);
  }
}

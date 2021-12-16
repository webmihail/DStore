import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { PermissionCreateDTO } from './dtos/permission.create.dto';
import { PermissionDTO } from './dtos/permission.dto';
import { PermissionEditDTO } from './dtos/permission.edit.dto';
import { Permission } from './entity/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionsRepository: Repository<Permission>,
  ) {}

  async getAll(): Promise<PermissionDTO[]> {
    return await this.permissionsRepository.find();
  }

  async getById(id: string): Promise<PermissionDTO> {
    return await this.permissionsRepository.findOne(id);
  }

  async create(data: PermissionCreateDTO): Promise<PermissionDTO> {
    const newPremission = await this.permissionsRepository.create(data);
    return await this.permissionsRepository.save(newPremission);
  }

  async update(id: string, data: PermissionEditDTO): Promise<PermissionDTO> {
    const premission = await this.getById(id);
    const editPremission = Object.assign(premission, data);
    return await this.permissionsRepository.save(editPremission);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.permissionsRepository.delete(id);
  }
}

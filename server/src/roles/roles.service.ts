import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { RoleCreateDTO } from './dtos/role.create.dto';
import { RoleDTO } from './dtos/role.dto';
import { RoleEditDTO } from './dtos/role.edit.dto';
import { Role } from './entity/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async getAll(): Promise<RoleDTO[]> {
    return await this.rolesRepository.find();
  }

  async getById(id: number): Promise<RoleDTO> {
    return await this.rolesRepository.findOne(id);
  }

  async getByValue(value: string): Promise<RoleDTO> {
    return await this.rolesRepository.findOne({
      where: {
        type: value,
      },
    });
  }

  async create(data: RoleCreateDTO): Promise<RoleDTO> {
    const newRole = await this.rolesRepository.create(data);
    return await this.rolesRepository.save(newRole);
  }

  async update(id: number, data: RoleEditDTO): Promise<RoleDTO> {
    const role = await this.getById(id);
    const editRole = Object.assign(role, data);
    return await this.rolesRepository.save(editRole);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.rolesRepository.delete(id);
  }
}

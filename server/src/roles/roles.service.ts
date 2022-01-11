import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionsService } from 'src/permissions/permissions.service';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { RoleCreateDTO } from './dtos/role.create.dto';
import { RoleEditDTO } from './dtos/role.edit.dto';
import { RoleEntity } from './entity/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>,
    private readonly permissionsService: PermissionsService,
  ) {}

  async getAll(): Promise<RoleEntity[]> {
    return await this.rolesRepository.find({
      relations: ['permissions'],
    });
  }

  async getById(id: string): Promise<RoleEntity> {
    return await this.rolesRepository.findOne(id, {
      relations: ['permissions'],
    });
  }

  async getByValue(value: string): Promise<RoleEntity> {
    return await this.rolesRepository.findOne({
      name: ILike(value),
    });
  }

  async create(data: RoleCreateDTO): Promise<RoleEntity> {
    const newRole = await this.rolesRepository.create(data);
    return await this.rolesRepository.save(newRole);
  }

  async update(id: string, data: RoleEditDTO): Promise<RoleEntity> {
    const role = await this.getById(id);
    const editRole = Object.assign(role, data);
    return await this.rolesRepository.save(editRole);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.rolesRepository.delete(id);
  }

  async addPermission(
    roleId: string,
    permissionId: string,
  ): Promise<RoleEntity> {
    const role = await this.getById(roleId);
    const equalPermissions = role.permissions.filter(
      (permission) => permission.id === permissionId,
    );

    if (equalPermissions.length === 0) {
      const permission = await this.permissionsService.getById(permissionId);
      role.permissions.push(permission);
    }

    const editRole = await this.rolesRepository.save(role);

    return editRole;
  }

  async deletePermission(
    roleId: string,
    permissionId: string,
  ): Promise<RoleEntity> {
    const role = await this.getById(roleId);
    const editPermissions = role.permissions.filter(
      (permission) => permission.id !== permissionId,
    );

    role.permissions = editPermissions;
    const editRole = await this.rolesRepository.save(role);

    return editRole;
  }
}

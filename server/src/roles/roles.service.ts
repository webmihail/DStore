import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionsService } from 'src/permissions/permissions.service';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { RoleCreateDTO } from './dtos/role.create.dto';
import { RoleDTO } from './dtos/role.dto';
import { RoleEditDTO } from './dtos/role.edit.dto';
import { Role } from './entity/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    private readonly permissionsService: PermissionsService,
  ) {}

  async getAll(): Promise<RoleDTO[]> {
    return await this.rolesRepository.find({
      relations: ['permissions'],
    });
  }

  async getById(id: string): Promise<RoleDTO> {
    return await this.rolesRepository.findOne(id, {
      relations: ['permissions'],
    });
  }

  async getByValue(value: string): Promise<RoleDTO> {
    return await this.rolesRepository.findOne({
      name: ILike(value),
    });
  }

  async create(data: RoleCreateDTO): Promise<RoleDTO> {
    const newRole = await this.rolesRepository.create(data);
    return await this.rolesRepository.save(newRole);
  }

  async update(id: string, data: RoleEditDTO): Promise<RoleDTO> {
    const role = await this.getById(id);
    const editRole = Object.assign(role, data);
    return await this.rolesRepository.save(editRole);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.rolesRepository.delete(id);
  }

  async addPermission(roleId: string, permissionId: string): Promise<RoleDTO> {
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
  ): Promise<RoleDTO> {
    const role = await this.getById(roleId);
    const editPermissions = role.permissions.filter(
      (permission) => permission.id !== permissionId,
    );

    role.permissions = editPermissions;
    const editRole = await this.rolesRepository.save(role);

    return editRole;
  }
}

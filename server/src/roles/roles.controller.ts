import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/guards/jwt.auth.guard';
import PermissionGuard from 'src/permissions/guards/permission.guard';
import { BanGuard } from 'src/bans/guards/ban.guard';
import { Permissions } from 'src/permissions/constants';
import { DeleteResult } from 'typeorm';
import { RoleCreateDTO } from './dtos/role.create.dto';
import { RoleEditDTO } from './dtos/role.edit.dto';
import { RoleEntity } from './entity/role.entity';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesServices: RolesService) {}

  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, type: [RoleEntity] })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionRoleManagementRead,
      Permissions.SubscriptionFullManagement,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllRoles(): Promise<RoleEntity[]> {
    return await this.rolesServices.getAll();
  }

  @ApiOperation({ summary: 'Get role by id' })
  @ApiResponse({ status: 200, type: RoleEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionRoleManagementRead,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getRole(@Param('id') id: string): Promise<RoleEntity> {
    return await this.rolesServices.getById(id);
  }

  @ApiOperation({ summary: 'Create new role' })
  @ApiResponse({ status: 200, type: RoleEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionRoleManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createRole(@Body() data: RoleCreateDTO): Promise<RoleEntity> {
    return await this.rolesServices.create(data);
  }

  @ApiOperation({ summary: 'Update role' })
  @ApiResponse({ status: 200, type: RoleEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionRoleManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() data: RoleEditDTO,
  ): Promise<RoleEntity> {
    return await this.rolesServices.update(id, data);
  }

  @ApiOperation({ summary: 'Delete role' })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionRoleManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteRole(@Param('id') id: string): Promise<DeleteResult> {
    return await this.rolesServices.delete(id);
  }

  @ApiOperation({ summary: 'Add permission to role' })
  @ApiResponse({ status: 200, type: RoleEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionRoleManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':roleId/add-permission/:permissionId')
  async addRoleToUser(
    @Param('roleId') roleId: string,
    @Param('permissionId') permissionId: string,
  ): Promise<RoleEntity> {
    return await this.rolesServices.addPermission(roleId, permissionId);
  }

  @ApiOperation({ summary: 'Delete permission from role' })
  @ApiResponse({ status: 200, type: RoleEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionRoleManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':roleId/delete-permission/:permissionId')
  async deleteRoleFromUser(
    @Param('roleId') roleId: string,
    @Param('permissionId') permissionId: string,
  ): Promise<RoleEntity> {
    return await this.rolesServices.deletePermission(roleId, permissionId);
  }
}

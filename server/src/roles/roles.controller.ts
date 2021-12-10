import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { RoleCreateDTO } from './dtos/role.create.dto';
import { RoleDTO } from './dtos/role.dto';
import { RoleEditDTO } from './dtos/role.edit.dto';
import { Role } from './entity/role.entity';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesServices: RolesService) {}

  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  async getAllRoles(): Promise<RoleDTO[]> {
    return await this.rolesServices.getAll();
  }

  @ApiOperation({ summary: 'Get role by id' })
  @ApiResponse({ status: 200, type: Role })
  @Get(':id')
  async getRole(@Param('id') id: number): Promise<RoleDTO> {
    return await this.rolesServices.getById(id);
  }

  @ApiOperation({ summary: 'Create new role' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  async createRole(@Body() data: RoleCreateDTO): Promise<RoleDTO> {
    return await this.rolesServices.create(data);
  }

  @ApiOperation({ summary: 'Update role' })
  @ApiResponse({ status: 200, type: Role })
  @Put(':id')
  async updateRole(
    @Param('id') id: number,
    @Body() data: RoleEditDTO,
  ): Promise<RoleDTO> {
    return await this.rolesServices.update(id, data);
  }

  @ApiOperation({ summary: 'Delete role' })
  @Delete(':id')
  async deleteRole(@Param('id') id: number): Promise<DeleteResult> {
    return await this.rolesServices.delete(id);
  }
}

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
import { PermissionCreateDTO } from './dtos/permission.create.dto';
import { PermissionDTO } from './dtos/permission.dto';
import { PermissionEditDTO } from './dtos/permission.edit.dto';
import { Permission } from './entity/permission.entity';
import { PermissionsService } from './permissions.service';

@ApiTags('Premissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsServices: PermissionsService) {}

  @ApiOperation({ summary: 'Get all permissions' })
  @ApiResponse({ status: 200, type: [Permission] })
  @Get()
  async getAllPermissions(): Promise<PermissionDTO[]> {
    return await this.permissionsServices.getAll();
  }

  @ApiOperation({ summary: 'Get permission by id' })
  @ApiResponse({ status: 200, type: Permission })
  @Get(':id')
  async getRole(@Param('id') id: string): Promise<PermissionDTO> {
    return await this.permissionsServices.getById(id);
  }

  @ApiOperation({ summary: 'Create new permission' })
  @ApiResponse({ status: 200, type: Permission })
  @Post()
  async createRole(@Body() data: PermissionCreateDTO): Promise<PermissionDTO> {
    return await this.permissionsServices.create(data);
  }

  @ApiOperation({ summary: 'Update permission' })
  @ApiResponse({ status: 200, type: Permission })
  @Put(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() data: PermissionEditDTO,
  ): Promise<PermissionDTO> {
    return await this.permissionsServices.update(id, data);
  }

  @ApiOperation({ summary: 'Delete permission' })
  @Delete(':id')
  async deleteRole(@Param('id') id: string): Promise<DeleteResult> {
    return await this.permissionsServices.delete(id);
  }
}

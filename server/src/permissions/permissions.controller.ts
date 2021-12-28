import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/guards/jwt.auth.guard';
import PermissionGuard from 'src/permissions/guards/permission.guard';
import { DeleteResult } from 'typeorm';
import { Permissions } from './constants';
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
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard([Permissions.SubscriptionFullManagement]))
  @Get()
  async getAllPermissions(): Promise<PermissionDTO[]> {
    return await this.permissionsServices.getAll();
  }

  @ApiOperation({ summary: 'Get permission by id' })
  @ApiResponse({ status: 200, type: Permission })
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard([Permissions.SubscriptionFullManagement]))
  @Get(':id')
  async getRole(@Param('id') id: string): Promise<PermissionDTO> {
    return await this.permissionsServices.getById(id);
  }

  @ApiOperation({ summary: 'Create new permission' })
  @ApiResponse({ status: 200, type: Permission })
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard([Permissions.SubscriptionFullManagement]))
  @Post()
  async createRole(@Body() data: PermissionCreateDTO): Promise<PermissionDTO> {
    return await this.permissionsServices.create(data);
  }

  @ApiOperation({ summary: 'Update permission' })
  @ApiResponse({ status: 200, type: Permission })
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard([Permissions.SubscriptionFullManagement]))
  @Put(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() data: PermissionEditDTO,
  ): Promise<PermissionDTO> {
    return await this.permissionsServices.update(id, data);
  }

  @ApiOperation({ summary: 'Delete permission' })
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard([Permissions.SubscriptionFullManagement]))
  @Delete(':id')
  async deleteRole(@Param('id') id: string): Promise<DeleteResult> {
    return await this.permissionsServices.delete(id);
  }
}

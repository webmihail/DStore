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
import { PermissionTypes } from 'src/permissions/constants';
import { Permissions } from 'src/permissions/decorators/permission.decorator';
import PermissionGuard from 'src/permissions/guards/permission.guard';
import { DeleteResult } from 'typeorm';
import { PermissionCreateDTO } from './dtos/permission.create.dto';
import { PermissionEditDTO } from './dtos/permission.edit.dto';
import { PermissionEntity } from './entity/permission.entity';
import { PermissionsService } from './permissions.service';

@ApiTags('Premissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsServices: PermissionsService) {}

  @ApiOperation({ summary: 'Get all permissions' })
  @ApiResponse({ status: 200, type: [PermissionEntity] })
  @Permissions(PermissionTypes.SubscriptionFullManagement)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Get()
  async getAllPermissions(): Promise<PermissionEntity[]> {
    return await this.permissionsServices.getAll();
  }

  @ApiOperation({ summary: 'Get permission by id' })
  @ApiResponse({ status: 200, type: PermissionEntity })
  @Permissions(PermissionTypes.SubscriptionFullManagement)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Get(':id')
  async getRole(@Param('id') id: string): Promise<PermissionEntity> {
    return await this.permissionsServices.getById(id);
  }

  @ApiOperation({ summary: 'Create new permission' })
  @ApiResponse({ status: 200, type: PermissionEntity })
  @Permissions(PermissionTypes.SubscriptionFullManagement)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Post()
  async createRole(
    @Body() data: PermissionCreateDTO,
  ): Promise<PermissionEntity> {
    return await this.permissionsServices.create(data);
  }

  @ApiOperation({ summary: 'Update permission' })
  @ApiResponse({ status: 200, type: PermissionEntity })
  @Permissions(PermissionTypes.SubscriptionFullManagement)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Put(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() data: PermissionEditDTO,
  ): Promise<PermissionEntity> {
    return await this.permissionsServices.update(id, data);
  }

  @ApiOperation({ summary: 'Delete permission' })
  @Permissions(PermissionTypes.SubscriptionFullManagement)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Delete(':id')
  async deleteRole(@Param('id') id: string): Promise<DeleteResult> {
    return await this.permissionsServices.delete(id);
  }
}

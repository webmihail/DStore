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
import PermissionGuard from 'src/permissions/guards/permission.guard';
import { SizesService } from './sizes.service';
import { Permissions } from '../permissions/constants';
import { BanGuard } from 'src/bans/guards/ban.guard';
import JwtAuthGuard from 'src/auth/guards/jwt.auth.guard';
import { SizeEntity } from './entity/size.entity';
import { SizeCreateDTO } from './dtos/size.create.dto';
import { SizeEditDTO } from './dtos/size.edit.dto';
import { DeleteResult } from 'typeorm';

@ApiTags('Sizes')
@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesServices: SizesService) {}

  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementRead,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all sizes' })
  @ApiResponse({ status: 200, type: [SizeEntity] })
  @Get()
  async getAllSizes(): Promise<SizeEntity[]> {
    return await this.sizesServices.getAll();
  }

  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementRead,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get size by id' })
  @ApiResponse({ status: 200, type: SizeEntity })
  @Get(':id')
  async getSize(@Param('id') id: string): Promise<SizeEntity> {
    return await this.sizesServices.getById(id);
  }

  @ApiOperation({ summary: 'Create size' })
  @ApiResponse({ status: 200, type: SizeEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createSize(@Body() data: SizeCreateDTO): Promise<SizeEntity> {
    return await this.sizesServices.create(data);
  }

  @ApiOperation({ summary: 'Update size' })
  @ApiResponse({ status: 200, type: SizeEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateSize(
    @Param('id') id: string,
    @Body() data: SizeEditDTO,
  ): Promise<SizeEntity> {
    return await this.sizesServices.update(id, data);
  }

  @ApiOperation({ summary: 'Delete size' })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteSize(@Param('id') id: string): Promise<DeleteResult> {
    return await this.sizesServices.delete(id);
  }
}

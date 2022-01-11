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
import { BanGuard } from 'src/bans/guards/ban.guard';
import { Permissions } from 'src/permissions/constants';
import PermissionGuard from 'src/permissions/guards/permission.guard';
import { DeleteResult } from 'typeorm';
import { BrandsService } from './brands.service';
import { BrandEditDTO } from './dtos/brand.edit.dto';
import { BrandCreateDTO } from './dtos/brend.create.dto';
import { BrandEntity } from './entity/brand.entity';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsServices: BrandsService) {}

  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementRead,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all brands' })
  @ApiResponse({ status: 200, type: [BrandEntity] })
  @Get()
  async getAllBrands(): Promise<BrandEntity[]> {
    return await this.brandsServices.getAll();
  }

  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementRead,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get brand by id' })
  @ApiResponse({ status: 200, type: BrandEntity })
  @Get(':id')
  async getBrand(@Param('id') id: string): Promise<BrandEntity> {
    return await this.brandsServices.getById(id);
  }

  @ApiOperation({ summary: 'Create brand' })
  @ApiResponse({ status: 200, type: BrandEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createBrand(@Body() data: BrandCreateDTO): Promise<BrandEntity> {
    return await this.brandsServices.create(data);
  }

  @ApiOperation({ summary: 'Update brand' })
  @ApiResponse({ status: 200, type: BrandEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateBrand(
    @Param('id') id: string,
    @Body() data: BrandEditDTO,
  ): Promise<BrandEntity> {
    return await this.brandsServices.update(id, data);
  }

  @ApiOperation({ summary: 'Delete brand' })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBrand(@Param('id') id: string): Promise<DeleteResult> {
    return await this.brandsServices.delete(id);
  }
}

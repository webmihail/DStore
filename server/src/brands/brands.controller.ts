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
import { PermissionTypes } from 'src/permissions/constants';
import { Permissions } from 'src/permissions/decorators/permission.decorator';
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

  @ApiOperation({ summary: 'Get all brands' })
  @ApiResponse({ status: 200, type: [BrandEntity] })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementRead,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Get()
  async getAllBrands(): Promise<BrandEntity[]> {
    return await this.brandsServices.getAll();
  }

  @ApiOperation({ summary: 'Get brand by id' })
  @ApiResponse({ status: 200, type: BrandEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementRead,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Get(':id')
  async getBrand(@Param('id') id: string): Promise<BrandEntity> {
    return await this.brandsServices.getById(id);
  }

  @ApiOperation({ summary: 'Create brand' })
  @ApiResponse({ status: 200, type: BrandEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Post()
  async createBrand(@Body() data: BrandCreateDTO): Promise<BrandEntity> {
    return await this.brandsServices.create(data);
  }

  @ApiOperation({ summary: 'Update brand' })
  @ApiResponse({ status: 200, type: BrandEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Put(':id')
  async updateBrand(
    @Param('id') id: string,
    @Body() data: BrandEditDTO,
  ): Promise<BrandEntity> {
    return await this.brandsServices.update(id, data);
  }

  @ApiOperation({ summary: 'Delete brand' })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Delete(':id')
  async deleteBrand(@Param('id') id: string): Promise<DeleteResult> {
    return await this.brandsServices.delete(id);
  }
}

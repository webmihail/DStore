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
import { ProductTypeCreateDTO } from './dtos/productType.create.dto';
import { ProductTypeEditDTO } from './dtos/productType.edit.dto';
import { ProductTypeEntity } from './entity/productType.entity';
import { ProductTypesService } from './productTypes.service';

@ApiTags('ProductTypes')
@Controller('product-types')
export class ProductTypesController {
  constructor(private readonly productTypesServices: ProductTypesService) {}

  @ApiOperation({ summary: 'Get all product types' })
  @ApiResponse({ status: 200, type: [ProductTypeEntity] })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementRead,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Get()
  async getAllProductTypes(): Promise<ProductTypeEntity[]> {
    return await this.productTypesServices.getAll();
  }

  @ApiOperation({ summary: 'Get all product types by category id' })
  @ApiResponse({ status: 200, type: [ProductTypeEntity] })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementRead,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Get('get-by-category/:categoryId')
  async getAllProductTypesByCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<ProductTypeEntity[]> {
    return await this.productTypesServices.getAllByCategoryId(categoryId);
  }

  @ApiOperation({ summary: 'Get product types by id' })
  @ApiResponse({ status: 200, type: ProductTypeEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementRead,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Get(':id')
  async getProductType(@Param('id') id: string): Promise<ProductTypeEntity> {
    return await this.productTypesServices.getById(id);
  }

  @ApiOperation({ summary: 'Create and add product type to category' })
  @ApiResponse({ status: 200, type: ProductTypeEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Post('create-to-category/:categoryId')
  async createProductTypeAndAddToCategory(
    @Param('categoryId') categoryId: string,
    @Body() data: ProductTypeCreateDTO,
  ): Promise<ProductTypeEntity> {
    return await this.productTypesServices.create(categoryId, data);
  }

  @ApiOperation({ summary: 'Update product type' })
  @ApiResponse({ status: 200, type: ProductTypeEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Put(':id')
  async updateProductType(
    @Param('id') id: string,
    @Body() data: ProductTypeEditDTO,
  ): Promise<ProductTypeEntity> {
    return await this.productTypesServices.update(id, data);
  }

  @ApiOperation({ summary: 'Delete product type' })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Delete(':id')
  async deleteProductType(@Param('id') id: string): Promise<DeleteResult> {
    return await this.productTypesServices.delete(id);
  }
}

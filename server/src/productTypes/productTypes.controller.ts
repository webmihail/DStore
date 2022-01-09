import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/guards/jwt.auth.guard';
import { BanGuard } from 'src/bans/guards/ban.guard';
import { Permissions } from 'src/permissions/constants';
import PermissionGuard from 'src/permissions/guards/permission.guard';
import { DeleteResult } from 'typeorm';
import { ProductTypeDTO } from './dtos/productType.dto';
import { ProductTypeEditDTO } from './dtos/productType.edit.dto';
import { ProductType } from './entity/productType.entity';
import { ProductTypesService } from './productTypes.service';

@ApiTags('ProductTypes')
@Controller('product-types')
export class ProductTypesController {
  constructor(private readonly productTypesServices: ProductTypesService) {}

  @ApiOperation({ summary: 'Get all product types' })
  @ApiResponse({ status: 200, type: [ProductType] })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementRead,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllProductTypes(): Promise<ProductTypeDTO[]> {
    return await this.productTypesServices.getAll();
  }

  @ApiOperation({ summary: 'Get all product types by category id' })
  @ApiResponse({ status: 200, type: [ProductType] })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementRead,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Get('get-by-category/:categoryId')
  async getAllProductTypesByCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<ProductTypeDTO[]> {
    return await this.productTypesServices.getAllByCategoryId(categoryId);
  }

  @ApiOperation({ summary: 'Get product types by id' })
  @ApiResponse({ status: 200, type: ProductType })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementRead,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProductType(@Param('id') id: string): Promise<ProductTypeDTO> {
    return await this.productTypesServices.getById(id);
  }

  @ApiOperation({ summary: 'Update product type' })
  @ApiResponse({ status: 200, type: ProductType })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProductType(
    @Param('id') id: string,
    @Body() data: ProductTypeEditDTO,
  ): Promise<ProductTypeDTO> {
    return await this.productTypesServices.update(id, data);
  }

  @ApiOperation({ summary: 'Delete product type' })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProductType(@Param('id') id: string): Promise<DeleteResult> {
    return await this.productTypesServices.delete(id);
  }
}

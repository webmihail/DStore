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
import { BanGuard } from 'src/bans/guards/ban.guard';
import { Permissions } from 'src/permissions/constants';
import PermissionGuard from 'src/permissions/guards/permission.guard';
import { DeleteResult } from 'typeorm';
import { ProductInfoCreateDTO } from './dtos/productInfo.create.dto';
import { ProductInfoEditDTO } from './dtos/productInfo.edit.dto';
import { ProductInfoEntity } from './entity/productInfo.entity';
import { ProductsInfoService } from './productsInfo.service';

@ApiTags('ProductsInfo')
@Controller('products-info')
export class ProductsInfoController {
  constructor(private readonly productsInfoService: ProductsInfoService) {}

  @ApiOperation({ summary: 'Get product type by id' })
  @ApiResponse({ status: 200, type: ProductInfoEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementRead,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProductType(@Param('id') id: string): Promise<ProductInfoEntity> {
    return await this.productsInfoService.getById(id);
  }

  @ApiOperation({ summary: 'Create and add product info to product' })
  @ApiResponse({ status: 200, type: ProductInfoEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Post('create-to-product/:productId')
  async createProductInfoAndAddToProduct(
    @Param('productId') productId: string,
    @Body() data: ProductInfoCreateDTO,
  ): Promise<ProductInfoEntity> {
    return await this.productsInfoService.create(productId, data);
  }

  @ApiOperation({ summary: 'Update product info' })
  @ApiResponse({ status: 200, type: ProductInfoEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProductInfo(
    @Param('id') id: string,
    @Body() data: ProductInfoEditDTO,
  ): Promise<ProductInfoEntity> {
    return await this.productsInfoService.update(id, data);
  }

  @ApiOperation({ summary: 'Delete product info' })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProductInfo(@Param('id') id: string): Promise<DeleteResult> {
    return await this.productsInfoService.delete(id);
  }

  @ApiOperation({ summary: 'Add size to product info' })
  @ApiResponse({ status: 200, type: ProductInfoEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':productInfoId/add-size/:sizeId')
  async addSizeToProductInfo(
    @Param('productInfoId') productInfoId: string,
    @Param('sizeId') sizeId: string,
  ): Promise<ProductInfoEntity> {
    return await this.productsInfoService.addSize(productInfoId, sizeId);
  }

  @ApiOperation({ summary: 'Delete size from product info' })
  @ApiResponse({ status: 200, type: ProductInfoEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':productInfoId/delete-size')
  async deleteSizeFromProductInfo(
    @Param('productInfoId') productInfoId: string,
  ): Promise<ProductInfoEntity> {
    return await this.productsInfoService.deleteSize(productInfoId);
  }

  @ApiOperation({ summary: 'Add size to product info' })
  @ApiResponse({ status: 200, type: ProductInfoEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':productInfoId/add-color/:colorId')
  async addColorToProductInfo(
    @Param('productInfoId') productInfoId: string,
    @Param('colorId') colorId: string,
  ): Promise<ProductInfoEntity> {
    return await this.productsInfoService.addColor(productInfoId, colorId);
  }

  @ApiOperation({ summary: 'Delete size from product info' })
  @ApiResponse({ status: 200, type: ProductInfoEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':productInfoId/delete-color')
  async deleteColorFromProductInfo(
    @Param('productInfoId') productInfoId: string,
  ): Promise<ProductInfoEntity> {
    return await this.productsInfoService.deleteColor(productInfoId);
  }
}

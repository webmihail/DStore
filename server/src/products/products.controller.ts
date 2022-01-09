import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/guards/jwt.auth.guard';
import { BanGuard } from 'src/bans/guards/ban.guard';
import { Permissions } from 'src/permissions/constants';
import PermissionGuard from 'src/permissions/guards/permission.guard';
import { DeleteResult } from 'typeorm';
import { ProductDTO } from './dtos/product.dto';
import { ProductEditDTO } from './dtos/product.edit.dto';
import { Product } from './entity/product.entity';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsServices: ProductsService) {}

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get()
  async getAllProducts(): Promise<ProductDTO[]> {
    return await this.productsServices.getAll();
  }

  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, type: Product })
  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<ProductDTO> {
    return await this.productsServices.getById(id);
  }

  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({ status: 200, type: Product })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() data: ProductEditDTO,
  ): Promise<ProductDTO> {
    return await this.productsServices.update(id, data);
  }

  @ApiOperation({ summary: 'Delete product' })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<DeleteResult> {
    return await this.productsServices.delete(id);
  }

  @ApiOperation({ summary: 'Add product type to product' })
  @ApiResponse({ status: 200, type: ProductDTO })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':productId/add-product-type/:productTypeId')
  async addProductTypeToProduct(
    @Param('productId') productId: string,
    @Param('productTypeId') productTypeId: string,
  ): Promise<ProductDTO> {
    return await this.productsServices.addProductType(productId, productTypeId);
  }

  @ApiOperation({ summary: 'Delete product type from product' })
  @ApiResponse({ status: 200, type: ProductDTO })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':productId/delete-product-type')
  async deleteProductFromCategory(
    @Param('productId') productId: string,
  ): Promise<ProductDTO> {
    return await this.productsServices.deleteProductType(productId);
  }
}

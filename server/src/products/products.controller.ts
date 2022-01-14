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
import { ProductInfoCreateDTO } from 'src/productsInfo/dtos/productInfo.create.dto';
import { DeleteResult } from 'typeorm';
import { ProductCreateDTO } from './dtos/product.create.dto';
import { ProductEditDTO } from './dtos/product.edit.dto';
import { ProductEntity } from './entity/product.entity';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsServices: ProductsService) {}

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, type: [ProductEntity] })
  @Get()
  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productsServices.getAll();
  }

  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, type: ProductEntity })
  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<ProductEntity> {
    return await this.productsServices.getById(id);
  }

  @ApiOperation({ summary: 'Create and add product to category' })
  @ApiResponse({ status: 200, type: ProductEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Post('create-product-to-category/:categoryId')
  async createProductAndAddToCategory(
    @Param('categoryId') categoryId: string,
    @Body() data: ProductCreateDTO,
  ): Promise<ProductEntity> {
    return await this.productsServices.create(categoryId, data);
  }

  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({ status: 200, type: ProductEntity })
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
  ): Promise<ProductEntity> {
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

  @ApiOperation({ summary: 'Add product to category' })
  @ApiResponse({ status: 200, type: ProductEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':productId/add-to-category/:categoryId')
  async addProductToCategory(
    @Param('productId') productId: string,
    @Param('categoryId') categoryId: string,
  ): Promise<ProductEntity> {
    return await this.productsServices.addToCategory(productId, categoryId);
  }

  @ApiOperation({ summary: 'Delete product from category' })
  @ApiResponse({ status: 200, type: ProductEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':productId/delete-from-category')
  async deleteProductFromCategory(
    @Param('productId') productId: string,
  ): Promise<ProductEntity> {
    return await this.productsServices.deleteFromCategory(productId);
  }

  @ApiOperation({ summary: 'Add product type to product' })
  @ApiResponse({ status: 200, type: ProductEntity })
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
  ): Promise<ProductEntity> {
    return await this.productsServices.addProductType(productId, productTypeId);
  }

  @ApiOperation({ summary: 'Delete product type from product' })
  @ApiResponse({ status: 200, type: ProductEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':productId/delete-product-type')
  async deleteProductTypeFromProduct(
    @Param('productId') productId: string,
  ): Promise<ProductEntity> {
    return await this.productsServices.deleteProductType(productId);
  }

  @ApiOperation({ summary: 'Add brand to product' })
  @ApiResponse({ status: 200, type: ProductEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':productId/add-brand/:brandId')
  async addBrandToProduct(
    @Param('productId') productId: string,
    @Param('brandId') brandId: string,
  ): Promise<ProductEntity> {
    return await this.productsServices.addBrand(productId, brandId);
  }

  @ApiOperation({ summary: 'Delete brand from product' })
  @ApiResponse({ status: 200, type: ProductEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':productId/delete-brand')
  async deleteBrandFromProduct(
    @Param('productId') productId: string,
  ): Promise<ProductEntity> {
    return await this.productsServices.deleteBrand(productId);
  }

  @ApiOperation({ summary: 'Add sale to product' })
  @ApiResponse({ status: 200, type: ProductEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':productId/add-sale/:saleId')
  async addSaleToProduct(
    @Param('productId') productId: string,
    @Param('saleId') saleId: string,
  ): Promise<ProductEntity> {
    return await this.productsServices.addSale(productId, saleId);
  }

  @ApiOperation({ summary: 'Delete sale from product' })
  @ApiResponse({ status: 200, type: ProductEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':productId/delete-sale')
  async deleteSaleFromProduct(
    @Param('productId') productId: string,
  ): Promise<ProductEntity> {
    return await this.productsServices.deleteSale(productId);
  }

  @ApiOperation({ summary: 'Create and add product info to product' })
  @ApiResponse({ status: 200, type: ProductEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':productId/create-product-info-to-product')
  async createProductInfoAndAddToProduct(
    @Param('productId') productId: string,
    @Body() data: ProductInfoCreateDTO,
  ): Promise<ProductEntity> {
    return await this.productsServices.createProductInfoToProduct(
      productId,
      data,
    );
  }
}

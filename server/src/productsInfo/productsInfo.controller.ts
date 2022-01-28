import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/guards/jwt.auth.guard';
import { BanGuard } from 'src/bans/guards/ban.guard';
import { PermissionTypes } from 'src/permissions/constants';
import { Permissions } from 'src/permissions/decorators/permission.decorator';
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
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementRead,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Get(':id')
  async getProductType(@Param('id') id: string): Promise<ProductInfoEntity> {
    return await this.productsInfoService.getById(id);
  }

  @ApiOperation({ summary: 'Create and add product info to product' })
  @ApiResponse({ status: 200, type: ProductInfoEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Post('create-to-product/:productId')
  async createProductInfoAndAddToProduct(
    @Param('productId') productId: string,
    @Body() data: ProductInfoCreateDTO,
  ): Promise<ProductInfoEntity> {
    return await this.productsInfoService.create(productId, data);
  }

  @ApiOperation({ summary: 'Update product info' })
  @ApiResponse({ status: 200, type: ProductInfoEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Put(':id')
  async updateProductInfo(
    @Param('id') id: string,
    @Body() data: ProductInfoEditDTO,
  ): Promise<ProductInfoEntity> {
    return await this.productsInfoService.update(id, data);
  }

  @ApiOperation({ summary: 'Delete product info' })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Delete(':id')
  async deleteProductInfo(@Param('id') id: string): Promise<DeleteResult> {
    return await this.productsInfoService.delete(id);
  }

  @ApiOperation({ summary: 'Change in stock status' })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Patch(':id/change-in-stock-status')
  async changeInStockStatus(
    @Param('id') id: string,
  ): Promise<ProductInfoEntity> {
    return await this.productsInfoService.changeInStockStatus(id);
  }

  @ApiOperation({ summary: 'Add size to product info' })
  @ApiResponse({ status: 200, type: ProductInfoEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Patch(':productInfoId/add-size/:sizeId')
  async addSizeToProductInfo(
    @Param('productInfoId') productInfoId: string,
    @Param('sizeId') sizeId: string,
  ): Promise<ProductInfoEntity> {
    return await this.productsInfoService.addSize(productInfoId, sizeId);
  }

  @ApiOperation({ summary: 'Delete size from product info' })
  @ApiResponse({ status: 200, type: ProductInfoEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Patch(':productInfoId/delete-size')
  async deleteSizeFromProductInfo(
    @Param('productInfoId') productInfoId: string,
  ): Promise<ProductInfoEntity> {
    return await this.productsInfoService.deleteSize(productInfoId);
  }

  @ApiOperation({ summary: 'Add size to product info' })
  @ApiResponse({ status: 200, type: ProductInfoEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Patch(':productInfoId/add-color/:colorId')
  async addColorToProductInfo(
    @Param('productInfoId') productInfoId: string,
    @Param('colorId') colorId: string,
  ): Promise<ProductInfoEntity> {
    return await this.productsInfoService.addColor(productInfoId, colorId);
  }

  @ApiOperation({ summary: 'Delete size from product info' })
  @ApiResponse({ status: 200, type: ProductInfoEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Patch(':productInfoId/delete-color')
  async deleteColorFromProductInfo(
    @Param('productInfoId') productInfoId: string,
  ): Promise<ProductInfoEntity> {
    return await this.productsInfoService.deleteColor(productInfoId);
  }

  @ApiOperation({ summary: 'Add image to product info' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 200, type: ProductInfoEntity })
  @Patch(':productInfoId/add-image')
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addImageToProductInfo(
    @Param('productInfoId') productInfoId: string,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    return this.productsInfoService.addImage(
      productInfoId,
      file.buffer,
      file.originalname,
    );
  }

  @ApiOperation({ summary: 'Delete image to product info' })
  @ApiResponse({ status: 200, type: ProductInfoEntity })
  @Patch(':productInfoId/delete-image/:imageId')
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  async deleteImageToProductInfo(
    @Param('productInfoId') productInfoId: string,
    @Param('imageId') imageId: string,
  ) {
    return this.productsInfoService.deleteImage(productInfoId, imageId);
  }
}

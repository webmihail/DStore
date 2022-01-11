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
}

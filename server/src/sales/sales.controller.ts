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
import { SalesService } from './sales.service';
import { BanGuard } from 'src/bans/guards/ban.guard';
import JwtAuthGuard from 'src/auth/guards/jwt.auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SaleEntity } from './entity/sale.entity';
import { SaleCreateDTO } from './dtos/sale.create.dto';
import { SaleEditDTO } from './dtos/sale.edit.dto';
import { DeleteResult } from 'typeorm';
import { PermissionTypes } from 'src/permissions/constants';
import { Permissions } from 'src/permissions/decorators/permission.decorator';
import PermissionGuard from 'src/permissions/guards/permission.guard';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesServices: SalesService) {}

  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementRead,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @ApiOperation({ summary: 'Get all sales' })
  @ApiResponse({ status: 200, type: [SaleEntity] })
  @Get()
  async getAllSales(): Promise<SaleEntity[]> {
    return await this.salesServices.getAll();
  }

  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementRead,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @ApiOperation({ summary: 'Get sale by id' })
  @ApiResponse({ status: 200, type: SaleEntity })
  @Get(':id')
  async getSale(@Param('id') id: string): Promise<SaleEntity> {
    return await this.salesServices.getById(id);
  }

  @ApiOperation({ summary: 'Create sale' })
  @ApiResponse({ status: 200, type: SaleEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Post()
  async createSale(@Body() data: SaleCreateDTO): Promise<SaleEntity> {
    return await this.salesServices.create(data);
  }

  @ApiOperation({ summary: 'Update sale' })
  @ApiResponse({ status: 200, type: SaleEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Put(':id')
  async updateSale(
    @Param('id') id: string,
    @Body() data: SaleEditDTO,
  ): Promise<SaleEntity> {
    return await this.salesServices.update(id, data);
  }

  @ApiOperation({ summary: 'Delete sale' })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Delete(':id')
  async deleteSale(@Param('id') id: string): Promise<DeleteResult> {
    return await this.salesServices.delete(id);
  }
}

import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BasketsService } from './baskets.service';
import { BasketEntity } from './entity/basket.entity';
import { PermissionTypes } from 'src/permissions/constants';
import { Permissions } from 'src/permissions/decorators/permission.decorator';
import { BanGuard } from 'src/bans/guards/ban.guard';
import JwtAuthGuard from 'src/auth/guards/jwt.auth.guard';
import PermissionGuard from 'src/permissions/guards/permission.guard';

@ApiTags('Baskets')
@Controller('baskets')
export class BasketsController {
  constructor(private readonly basketsService: BasketsService) {}
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionOrderManagementRead,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @ApiOperation({ summary: 'Get basket by id' })
  @ApiResponse({ status: 200, type: BasketEntity })
  @Get(':id')
  async getBasket(@Param('id') id: string): Promise<BasketEntity> {
    return await this.basketsService.getById(id);
  }

  @ApiOperation({ summary: 'Add piece to basket' })
  @ApiResponse({ status: 200, type: BasketEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionOrderManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Patch(':basketId/add-product/:productId')
  async createAndAddPieceToUserBasket(
    @Param('basketId') basketId: string,
    @Param('productId') productId: string,
  ): Promise<BasketEntity> {
    return await this.basketsService.addPiece(basketId, productId);
  }

  @ApiOperation({ summary: 'Clear basket' })
  @ApiResponse({ status: 200, type: BasketEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionOrderManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Patch(':basketId/clear-basket')
  async clearBasket(
    @Param('basketId') basketId: string,
  ): Promise<BasketEntity> {
    return await this.basketsService.clearBasket(basketId);
  }
}

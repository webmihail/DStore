import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import PermissionGuard from 'src/permissions/guards/permission.guard';
import { OrderEntity } from './entity/order.entity';
import { OrdersService } from './orders.service';
import { Permissions } from 'src/permissions/constants';
import JwtAuthGuard from 'src/auth/guards/jwt.auth.guard';
import { BanGuard } from 'src/bans/guards/ban.guard';
import { DeleteResult } from 'typeorm';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionOrderManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get orders by user id' })
  @ApiResponse({ status: 200, type: OrderEntity })
  @Get('by/:userId')
  async getAllOrdersByUserId(
    @Param('userId') userId: string,
  ): Promise<OrderEntity[]> {
    return await this.ordersService.getAllByUserId(userId);
  }

  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionOrderManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get order by id' })
  @ApiResponse({ status: 200, type: OrderEntity })
  @Get(':id')
  async getOrder(@Param('id') id: string): Promise<OrderEntity> {
    return await this.ordersService.getById(id);
  }

  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionOrderManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create order' })
  @ApiResponse({ status: 200, type: OrderEntity })
  @Post('create/:userId')
  async createOrder(@Param('userId') userId: string): Promise<OrderEntity> {
    return await this.ordersService.create(userId);
  }

  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionOrderManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete order' })
  @ApiResponse({ status: 200, type: OrderEntity })
  @Delete(':id')
  async deleteOrder(@Param('id') id: string): Promise<DeleteResult> {
    return await this.ordersService.delete(id);
  }

  @ApiOperation({ summary: 'Add delivery to order' })
  @ApiResponse({ status: 200, type: OrderEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionOrderManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':orderId/add-delivery/:deliveryId')
  async addDeliveryToOrder(
    @Param('orderId') orderId: string,
    @Param('deliveryId') deliveryId: string,
  ): Promise<OrderEntity> {
    return await this.ordersService.addDelivery(orderId, deliveryId);
  }

  @ApiOperation({ summary: 'Delete delivery from order' })
  @ApiResponse({ status: 200, type: OrderEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionOrderManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':orderId/delete-delivery')
  async deleteDeliveryFromOrder(
    @Param('orderId') orderId: string,
  ): Promise<OrderEntity> {
    return await this.ordersService.deleteDelivery(orderId);
  }
}

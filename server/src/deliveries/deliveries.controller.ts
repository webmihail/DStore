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
import { DeliveriesService } from './deliveries.service';
import { DeliveryEntity } from './entity/delivery.entity';
import { DeliveryCreateDTO } from './dtos/delivery.create.dto';
import { DeliveryEditDTO } from './dtos/delivery.edit.dto';
import { DeleteResult } from 'typeorm';

@ApiTags('Deliveries')
@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @UseGuards(JwtAuthGuard, BanGuard)
  @ApiOperation({ summary: 'Get all deliveries by user id' })
  @ApiResponse({ status: 200, type: [DeliveryEntity] })
  @Get('all-deliveries-by/:userId')
  async getAllProducts(
    @Param('userId') userId: string,
  ): Promise<DeliveryEntity[]> {
    return await this.deliveriesService.getAllByUserId(userId);
  }

  @UseGuards(JwtAuthGuard, BanGuard)
  @ApiOperation({ summary: 'Get delivery by id' })
  @ApiResponse({ status: 200, type: DeliveryEntity })
  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<DeliveryEntity> {
    return await this.deliveriesService.getById(id);
  }

  @ApiOperation({ summary: 'Create and add delivery to user' })
  @ApiResponse({ status: 200, type: DeliveryEntity })
  @UseGuards(JwtAuthGuard, BanGuard)
  @Post('create-delivery-to-user/:userId')
  async createProductAndAddToCategory(
    @Param('userId') userId: string,
    @Body() data: DeliveryCreateDTO,
  ): Promise<DeliveryEntity> {
    return await this.deliveriesService.create(userId, data);
  }

  @ApiOperation({ summary: 'Update delivery' })
  @ApiResponse({ status: 200, type: DeliveryEntity })
  @UseGuards(JwtAuthGuard, BanGuard)
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() data: DeliveryEditDTO,
  ): Promise<DeliveryEntity> {
    return await this.deliveriesService.update(id, data);
  }

  @ApiOperation({ summary: 'Delete delivery' })
  @UseGuards(JwtAuthGuard, BanGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<DeleteResult> {
    return await this.deliveriesService.delete(id);
  }
}

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
import { DeleteResult } from 'typeorm';
import { RatingCreateDTO } from './dtos/rating.create.dto';
import { RatingEditDTO } from './dtos/rating.edit.dto';
import { RatingEntity } from './entity/rating.entity';
import { RatingsService } from './ratings.service';
import { PermissionTypes } from 'src/permissions/constants';
import { Permissions } from 'src/permissions/decorators/permission.decorator';
import PermissionGuard from 'src/permissions/guards/permission.guard';

@ApiTags('Ratings')
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @UseGuards(JwtAuthGuard, BanGuard)
  @ApiOperation({ summary: 'Get all ratings by product id' })
  @ApiResponse({ status: 200, type: [RatingEntity] })
  @Get('all-ratings-by/:productId')
  async getAllRatingsByProduct(
    @Param('productId') productId: string,
  ): Promise<RatingEntity[]> {
    return await this.ratingsService.getAllByProductId(productId);
  }

  @ApiOperation({ summary: 'Create and add rating to product' })
  @ApiResponse({ status: 200, type: RatingEntity })
  @UseGuards(JwtAuthGuard, BanGuard)
  @Post('by-user/:userId/create-rating-to-product/:productId')
  async createRatingForProduct(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body() data: RatingCreateDTO,
  ): Promise<RatingEntity> {
    return await this.ratingsService.create(userId, productId, data);
  }

  @ApiOperation({ summary: 'Update rating' })
  @ApiResponse({ status: 200, type: RatingEntity })
  @Permissions(PermissionTypes.SubscriptionFullManagement)
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Put(':id')
  async updateRating(
    @Param('id') id: string,
    @Body() data: RatingEditDTO,
  ): Promise<RatingEntity> {
    return await this.ratingsService.update(id, data);
  }

  @ApiOperation({ summary: 'Delete rating' })
  @Permissions(PermissionTypes.SubscriptionFullManagement)
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Delete(':id')
  async deleteRating(@Param('id') id: string): Promise<DeleteResult> {
    return await this.ratingsService.delete(id);
  }
}

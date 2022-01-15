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
import PermissionGuard from 'src/permissions/guards/permission.guard';
import { DeleteResult } from 'typeorm';
import { RatingCreateDTO } from './dtos/rating.create.dto';
import { RatingEditDTO } from './dtos/rating.edit.dto';
import { RatingEntity } from './entity/rating.entity';
import { RatingsService } from './ratings.service';
import { Permissions } from 'src/permissions/constants';

@ApiTags('Ratings')
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(PermissionGuard([Permissions.SubscriptionFullManagement]))
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateRating(
    @Param('id') id: string,
    @Body() data: RatingEditDTO,
  ): Promise<RatingEntity> {
    return await this.ratingsService.update(id, data);
  }

  @ApiOperation({ summary: 'Delete rating' })
  @UseGuards(PermissionGuard([Permissions.SubscriptionFullManagement]))
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteRating(@Param('id') id: string): Promise<DeleteResult> {
    return await this.ratingsService.delete(id);
  }
}

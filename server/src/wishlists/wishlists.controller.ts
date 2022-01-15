import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/guards/jwt.auth.guard';
import { BanGuard } from 'src/bans/guards/ban.guard';
import { WishlistEntity } from './entity/wishlist.entity';
import { WishlistsService } from './wishlists.service';

@ApiTags('Wishlists')
@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get wishlist by id' })
  @ApiResponse({ status: 200, type: [WishlistEntity] })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<WishlistEntity> {
    return await this.wishlistsService.getById(id);
  }

  @ApiOperation({ summary: 'Add product to wishlist' })
  @ApiResponse({ status: 200, type: WishlistEntity })
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':wishlistId/add-product/:productId')
  async addProductToWishlist(
    @Param('wishlistId') wishlistId: string,
    @Param('productId') productId: string,
  ): Promise<WishlistEntity> {
    return await this.wishlistsService.addProduct(wishlistId, productId);
  }

  @ApiOperation({ summary: 'Delete product from wishlist' })
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':wishlistId/delete-product/:productId')
  async deleteProductFromWishlist(
    @Param('wishlistId') wishlistId: string,
    @Param('productId') productId: string,
  ): Promise<WishlistEntity> {
    return await this.wishlistsService.deleteProduct(wishlistId, productId);
  }
}

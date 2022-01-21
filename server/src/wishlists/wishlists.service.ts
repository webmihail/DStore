import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { UserEntity } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { WishlistEntity } from './entity/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(WishlistEntity)
    private readonly wishlistRepository: Repository<WishlistEntity>,
    private readonly productsService: ProductsService,
  ) {}

  async getByUserId(userId: string): Promise<WishlistEntity> {
    return await this.wishlistRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['products'],
    });
  }

  async getById(id: string): Promise<WishlistEntity> {
    return await this.wishlistRepository.findOne(id, {
      relations: ['products'],
    });
  }

  async create(user: UserEntity): Promise<WishlistEntity> {
    const newWishlist = await this.wishlistRepository.create({ user });
    return await this.wishlistRepository.save(newWishlist);
  }

  async addProduct(
    wishlistId: string,
    productId: string,
  ): Promise<WishlistEntity> {
    const wishlist = await this.getById(wishlistId);
    const product = await this.productsService.getById(productId);
    const productIsExist =
      wishlist.products &&
      wishlist.products.filter((product) => product.id === productId);

    if (productIsExist && productIsExist.length !== 0)
      throw new BadRequestException('Ви вже добавили цей продукт');

    wishlist.products.push(product);

    return this.wishlistRepository.save(wishlist);
  }

  async deleteProduct(
    wishlistId: string,
    productId: string,
  ): Promise<WishlistEntity> {
    const wishlist = await this.getById(wishlistId);
    const editProducts = wishlist.products.filter(
      (product) => product.id !== productId,
    );

    wishlist.products = editProducts;

    return await this.wishlistRepository.save(wishlist);
  }
}

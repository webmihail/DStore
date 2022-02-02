import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { DeleteResult, Repository } from 'typeorm';
import { RatingCreateDTO } from './dtos/rating.create.dto';
import { RatingEditDTO } from './dtos/rating.edit.dto';
import { RatingEntity } from './entity/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
    private readonly usersServices: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  async getAllByProductId(productId: string): Promise<RatingEntity[]> {
    return await this.ratingRepository.find({
      where: {
        product: {
          id: productId,
        },
      },
    });
  }

  async getById(id: string): Promise<RatingEntity> {
    return await this.ratingRepository.findOne(id);
  }

  async create(
    userId: string,
    productId: string,
    data: RatingCreateDTO,
  ): Promise<RatingEntity> {
    const user = await this.usersServices.getById(userId);
    const product = await this.productsService.getById(productId);
    const newRating = await this.ratingRepository.create(data);
    const equalRating = product.ratings.filter(
      (rating) => rating.user.id === userId,
    );

    if (equalRating.length !== 0)
      throw new BadRequestException('You have already rated this product');

    newRating.user = user;
    newRating.product = product;
    return await this.ratingRepository.save(newRating);
  }

  async update(id: string, data: RatingEditDTO): Promise<RatingEntity> {
    const rating = await this.getById(id);
    const editRating = Object.assign(rating, data);
    return await this.ratingRepository.save(editRating);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.ratingRepository.delete(id);
  }
}

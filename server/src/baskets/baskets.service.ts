import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PiecesService } from 'src/pieces/pieces.service';
import { UserEntity } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { BasketEntity } from './entity/basket.entity';

@Injectable()
export class BasketsService {
  constructor(
    @InjectRepository(BasketEntity)
    private readonly basketRepository: Repository<BasketEntity>,
    private readonly piecesService: PiecesService,
  ) {}

  async getById(id: string): Promise<BasketEntity> {
    return await this.basketRepository.findOne(id, {
      relations: ['pieces', 'pieces.product'],
    });
  }

  async create(user: UserEntity): Promise<BasketEntity> {
    const newBasket = await this.basketRepository.create({ user });
    return await this.basketRepository.save(newBasket);
  }

  async addPiece(basketId: string, productId: string): Promise<BasketEntity> {
    const basket = await this.getById(basketId);
    const foundPiece =
      basket.pieces &&
      basket.pieces.find((piece) => piece.product.id === productId);

    if (foundPiece) {
      const editPiece = await this.piecesService.update(foundPiece.id, {
        productId,
        count: foundPiece.count + 1,
      });

      basket.pieces = basket.pieces.map((currentPiece) => {
        if (currentPiece.id === editPiece.id) {
          return editPiece;
        }
        return currentPiece;
      });
    } else {
      const newPiece = await this.piecesService.create({
        count: 1,
        productId,
      });

      basket.pieces.push(newPiece);
    }

    return this.basketRepository.save(basket);
  }

  async subtractPiece(
    basketId: string,
    productId: string,
  ): Promise<BasketEntity> {
    const basket = await this.getById(basketId);
    const foundPiece = basket.pieces.find(
      (piece) => piece.product.id === productId,
    );

    const editPiece = await this.piecesService.update(foundPiece.id, {
      productId,
      count: foundPiece.count - 1,
    });

    basket.pieces = basket.pieces.map((currentPiece) => {
      if (currentPiece.id === editPiece.id) {
        return editPiece;
      }
      return currentPiece;
    });

    return this.basketRepository.save(basket);
  }

  async clearBasket(basketId): Promise<BasketEntity> {
    const basket = await this.getById(basketId);
    basket.pieces = [];
    return await this.basketRepository.save(basket);
  }
}

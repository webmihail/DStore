import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketsService } from 'src/baskets/baskets.service';
import { DeliveriesService } from 'src/deliveries/deliveries.service';
import { PaymentsService } from 'src/payments/payments.service';
import { PieceEntity } from 'src/pieces/entity/piece.entity';
import { UsersService } from 'src/users/users.service';
import { DeleteResult, Repository } from 'typeorm';
import { OrderEntity } from './entity/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
    private readonly usersServices: UsersService,
    private readonly paymentsService: PaymentsService,
    private readonly deliveriesServices: DeliveriesService,
    private readonly basketsService: BasketsService,
  ) {}

  async getAll(userId: string): Promise<OrderEntity[]> {
    return await this.ordersRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['pieces'],
    });
  }

  async getById(id: string): Promise<OrderEntity> {
    return await this.ordersRepository.findOne(id, {
      relations: ['pieces'],
    });
  }

  async create(userId: string): Promise<OrderEntity> {
    const user = await this.usersServices.getById(userId);
    const count = user.basket.pieces.reduce(
      (accumulator: number, piece: PieceEntity) => {
        return accumulator + piece.count;
      },
      0,
    );

    const price = user.basket.pieces.reduce(
      (accumulator: number, piece: PieceEntity) => {
        return accumulator + piece.price;
      },
      0,
    );

    const newOrder = await this.ordersRepository.create({
      user,
      pieces: user.basket.pieces,
      price,
      count,
    });

    const order = await this.ordersRepository.save(newOrder);

    await this.basketsService.clearBasket(user.basket.id);

    return order;
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.ordersRepository.delete(id);
  }
}

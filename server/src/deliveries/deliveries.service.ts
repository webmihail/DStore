import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { DeleteResult, Repository } from 'typeorm';
import { DeliveryCreateDTO } from './dtos/delivery.create.dto';
import { DeliveryEditDTO } from './dtos/delivery.edit.dto';
import { DeliveryEntity } from './entity/delivery.entity';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(DeliveryEntity)
    private readonly deliveryRepository: Repository<DeliveryEntity>,
    private readonly usersServices: UsersService,
  ) {}

  async getAllByUserId(userId: string): Promise<DeliveryEntity[]> {
    return await this.deliveryRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async getById(id: string): Promise<DeliveryEntity> {
    return await this.deliveryRepository.findOne(id);
  }

  async create(
    userId: string,
    data: DeliveryCreateDTO,
  ): Promise<DeliveryEntity> {
    const user = await this.usersServices.getById(userId);
    const newDelivery = await this.deliveryRepository.create(data);
    newDelivery.user = user;
    return await this.deliveryRepository.save(newDelivery);
  }

  async update(id: string, data: DeliveryEditDTO): Promise<DeliveryEntity> {
    const size = await this.getById(id);
    const editSize = Object.assign(size, data);
    return await this.deliveryRepository.save(editSize);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.deliveryRepository.delete(id);
  }
}

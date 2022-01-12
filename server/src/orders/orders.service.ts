import { Injectable } from '@nestjs/common';
import { BasketsService } from 'src/baskets/baskets.service';
import { DeliveriesService } from 'src/deliveries/deliveries.service';
import { PaymentsService } from 'src/payments/payments.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly usersServices: UsersService,
    private readonly paymentsService: PaymentsService,
    private readonly deliveriesServices: DeliveriesService,
    private readonly basketsService: BasketsService,
  ) {}
}

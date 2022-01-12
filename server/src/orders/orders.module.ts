import { Module } from '@nestjs/common';
import { BasketsModule } from 'src/baskets/baskets.module';
import { DeliveriesModule } from 'src/deliveries/deliveries.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { UsersModule } from 'src/users/users.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [UsersModule, PaymentsModule, DeliveriesModule, BasketsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

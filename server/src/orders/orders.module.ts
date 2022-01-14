import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketsModule } from 'src/baskets/baskets.module';
import { DeliveriesModule } from 'src/deliveries/deliveries.module';
import { UsersModule } from 'src/users/users.module';
import { OrderEntity } from './entity/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    UsersModule,
    DeliveriesModule,
    BasketsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

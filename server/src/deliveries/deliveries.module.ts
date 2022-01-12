import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { DeliveriesController } from './deliveries.controller';
import { DeliveriesService } from './deliveries.service';

@Module({
  imports: [UsersModule],
  controllers: [DeliveriesController],
  providers: [DeliveriesService],
  exports: [DeliveriesService],
})
export class DeliveriesModule {}

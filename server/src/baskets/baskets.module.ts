import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PiecesModule } from 'src/pieces/pieces.module';
import { BasketsController } from './baskets.controller';
import { BasketsService } from './baskets.service';
import { BasketEntity } from './entity/basket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BasketEntity]), PiecesModule],
  controllers: [BasketsController],
  providers: [BasketsService],
  exports: [BasketsService],
})
export class BasketsModule {}

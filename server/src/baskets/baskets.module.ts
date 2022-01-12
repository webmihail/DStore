import { Module } from '@nestjs/common';
import { PiecesModule } from 'src/pieces/pieces.module';
import { UsersModule } from 'src/users/users.module';
import { BasketsController } from './baskets.controller';
import { BasketsService } from './baskets.service';

@Module({
  imports: [UsersModule, PiecesModule],
  controllers: [BasketsController],
  providers: [BasketsService],
  exports: [BasketsService],
})
export class BasketsModule {}

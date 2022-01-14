import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { PieceEntity } from './entity/piece.entity';
import { PiecesController } from './pieces.controller';
import { PiecesService } from './pieces.service';

@Module({
  imports: [TypeOrmModule.forFeature([PieceEntity]), ProductsModule],
  controllers: [PiecesController],
  providers: [PiecesService],
  exports: [PiecesService],
})
export class PiecesModule {}

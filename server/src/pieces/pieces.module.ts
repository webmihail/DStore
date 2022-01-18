import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsInfoModule } from 'src/productsInfo/productsInfo.module';
import { PieceEntity } from './entity/piece.entity';
import { PiecesController } from './pieces.controller';
import { PiecesService } from './pieces.service';

@Module({
  imports: [TypeOrmModule.forFeature([PieceEntity]), ProductsInfoModule],
  controllers: [PiecesController],
  providers: [PiecesService],
  exports: [PiecesService],
})
export class PiecesModule {}

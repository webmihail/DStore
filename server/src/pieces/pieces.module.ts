import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { PiecesController } from './pieces.controller';
import { PiecesService } from './pieces.service';

@Module({
  imports: [ProductsModule],
  controllers: [PiecesController],
  providers: [PiecesService],
  exports: [PiecesService],
})
export class PiecesModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsModule } from 'src/colors/colors.module';
import { SizesModule } from 'src/sizes/sizes.module';
import { ProductInfoEntity } from './entity/productInfo.entity';
import { ProductsInfoController } from './productsInfo.controller';
import { ProductsInfoService } from './productsInfo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductInfoEntity]),
    SizesModule,
    ColorsModule,
  ],
  controllers: [ProductsInfoController],
  providers: [ProductsInfoService],
  exports: [ProductsInfoService],
})
export class ProductsInfoModule {}

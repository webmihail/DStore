import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsModule } from 'src/brands/brands.module';
import { CategoryEntity } from 'src/categories/entity/category.entity';
import { ProductsInfoModule } from 'src/productsInfo/productsInfo.module';
import { ProductTypesModule } from 'src/productTypes/productTypes.module';
import { SalesModule } from 'src/sales/sales.module';
import { ProductEntity } from './entity/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity]),
    ProductTypesModule,
    BrandsModule,
    SalesModule,
    ProductsInfoModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}

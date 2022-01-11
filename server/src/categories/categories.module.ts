import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/products/entity/product.entity';
import { ProductsModule } from 'src/products/products.module';
import { ProductTypesModule } from 'src/productTypes/productTypes.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './entity/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, ProductEntity]),
    ProductsModule,
    ProductTypesModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entity/product.entity';
import { ProductsModule } from 'src/products/products.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product]), ProductsModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}

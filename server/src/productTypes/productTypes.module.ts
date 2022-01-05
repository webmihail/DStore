import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductType } from './entity/productType.entity';
import { ProductTypesController } from './productTypes.controller';
import { ProductTypesService } from './productTypes.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductType]), CategoriesModule],
  controllers: [ProductTypesController],
  providers: [ProductTypesService],
})
export class ProductTypesModule {}

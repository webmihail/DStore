import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategory } from 'src/subcategory/entity/subcategory.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './entity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Subcategory])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

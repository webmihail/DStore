import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entity/category.entity';
import { Subcategory } from './entity/subcategory.entity';
import { SubcategoryController } from './subcategory.controller';
import { SubcategoryService } from './subcategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subcategory, Category])],
  controllers: [SubcategoryController],
  providers: [SubcategoryService],
})
export class SubcategoryModule {}

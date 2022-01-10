import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypeEntity } from './entity/productType.entity';
import { ProductTypesController } from './productTypes.controller';
import { ProductTypesService } from './productTypes.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTypeEntity])],
  controllers: [ProductTypesController],
  providers: [ProductTypesService],
  exports: [ProductTypesService],
})
export class ProductTypesModule {}

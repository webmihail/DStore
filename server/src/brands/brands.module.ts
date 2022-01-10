import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { BrandEntity } from './entity/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}

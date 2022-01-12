import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';
import { ColorEntity } from './entity/color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColorEntity])],
  controllers: [ColorsController],
  providers: [ColorsService],
  exports: [ColorsService],
})
export class ColorsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizeEntity } from './entity/size.entity';
import { SizesController } from './sizes.controller';
import { SizesService } from './sizes.service';

@Module({
  imports: [TypeOrmModule.forFeature([SizeEntity])],
  controllers: [SizesController],
  providers: [SizesService],
})
export class SizesModule {}

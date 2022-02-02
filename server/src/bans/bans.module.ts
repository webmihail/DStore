import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BansController } from './bans.controller';
import { BansService } from './bans.service';
import { BanEntity } from './entity/ban.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BanEntity])],
  controllers: [BansController],
  providers: [BansService],
  exports: [BansService],
})
export class BansModule {}

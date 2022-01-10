import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entity/user.entity';
import { BansController } from './bans.controller';
import { BansService } from './bans.service';
import { BanEntity } from './entity/ban.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BanEntity, UserEntity])],
  controllers: [BansController],
  providers: [BansService],
  exports: [BansService],
})
export class BansModule {}

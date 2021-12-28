import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { BansController } from './bans.controller';
import { BansService } from './bans.service';
import { Ban } from './entity/ban.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ban, User])],
  controllers: [BansController],
  providers: [BansService],
  exports: [BansService],
})
export class BansModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BansModule } from 'src/bans/bans.module';
import { BanEntity } from 'src/bans/entity/ban.entity';
import { PiecesModule } from 'src/pieces/pieces.module';
import { RoleEntity } from 'src/roles/entity/role.entity';
import { RolesModule } from 'src/roles/roles.module';
import { UserEntity } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, BanEntity]),
    RolesModule,
    BansModule,
    PiecesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

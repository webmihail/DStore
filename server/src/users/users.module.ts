import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BansModule } from 'src/bans/bans.module';
import { Ban } from 'src/bans/entity/ban.entity';
import { Role } from 'src/roles/entity/role.entity';
import { RolesModule } from 'src/roles/roles.module';
import { User } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Ban]),
    RolesModule,
    BansModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BansModule } from 'src/bans/bans.module';
import { BasketsModule } from 'src/baskets/baskets.module';
import { RolesModule } from 'src/roles/roles.module';
import { WishlistsModule } from 'src/wishlists/wishlists.module';
import { UserEntity } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    RolesModule,
    BansModule,
    BasketsModule,
    WishlistsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

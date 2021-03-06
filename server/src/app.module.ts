import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DbConnectModule } from './dbConnect/dbConnect.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { BansModule } from './bans/bans.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ProductTypesModule } from './productTypes/productTypes.module';
import { BrandsModule } from './brands/brands.module';
import { SalesModule } from './sales/sales.module';
import { ProductsInfoModule } from './productsInfo/productsInfo.module';
import { SizesModule } from './sizes/sizes.module';
import { ColorsModule } from './colors/colors.module';
import { OrdersModule } from './orders/orders.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { BasketsModule } from './baskets/baskets.module';
import { PiecesModule } from './pieces/pieces.module';
import { CommentsModule } from './comments/comments.module';
import { RatingsModule } from './ratings/ratings.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { TelegramMessengerModule } from './telegramMessenger/telegramMessenger.module';
import { FileManagerModule } from './fileManager/fileManager.module';

@Module({
  imports: [
    DbConnectModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    AuthModule,
    EmailModule,
    BansModule,
    CategoriesModule,
    ProductsModule,
    ProductTypesModule,
    BrandsModule,
    SalesModule,
    ProductsInfoModule,
    SizesModule,
    ColorsModule,
    OrdersModule,
    DeliveriesModule,
    PiecesModule,
    BasketsModule,
    CommentsModule,
    RatingsModule,
    WishlistsModule,
    TelegramMessengerModule,
    FileManagerModule,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}

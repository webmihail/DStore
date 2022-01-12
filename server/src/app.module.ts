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
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}

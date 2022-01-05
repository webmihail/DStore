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
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}

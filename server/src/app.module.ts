import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DbConnect } from './dbConnect/dbConnect.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DbConnect, UsersModule, RolesModule, PermissionsModule, AuthModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}

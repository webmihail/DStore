import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DbConnect } from './dbConnect/dbConnect.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [DbConnect, UsersModule, RolesModule, PermissionsModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}

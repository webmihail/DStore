import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DbConnect } from './dbConnect/dbConnect.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [DbConnect, UsersModule, RolesModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}

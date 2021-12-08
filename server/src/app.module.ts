import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DbConnect } from './dbConnect/dbConnect.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DbConnect, UsersModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}

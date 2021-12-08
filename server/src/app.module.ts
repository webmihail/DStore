import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DbConnect } from './dbConnect/dbConnect.module';

@Module({
  imports: [DbConnect],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}

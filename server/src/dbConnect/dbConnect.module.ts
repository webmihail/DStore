import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as typeOrmConfig from '../../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig as TypeOrmModuleOptions)],
})
export class DbConnectModule {}

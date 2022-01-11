import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/permissions/entity/permission.entity';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { UserEntity } from 'src/users/entity/user.entity';
import { RoleEntity } from './entity/role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity, UserEntity, PermissionEntity]),
    PermissionsModule,
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}

/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import settings from 'settings';
import { Permissions } from 'src/permissions/constants';
import { Permission } from 'src/permissions/entity/permission.entity';
import { Role } from 'src/roles/entity/role.entity';
import { User } from 'src/users/entity/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSuperAdminWithRoleAndPermission1639681626353
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepo = queryRunner.connection.getRepository(User);
    const roleRepo = queryRunner.connection.getRepository(Role);
    const permissionRepo = queryRunner.connection.getRepository(Permission);

    const newPremission = await permissionRepo.create({
      name: settings.superadmin.permissionName as Permissions,
      description: settings.superadmin.permissionDescription,
    });

    const permission = await permissionRepo.save(newPremission);

    const newRole = await roleRepo.create({
      name: settings.superadmin.roleName,
      description: settings.superadmin.roleDescription,
      permissions: [permission],
    });

    const role = await roleRepo.save(newRole);

    const newUser = await userRepo.create({
      firstName: settings.superadmin.firstName,
      lastName: settings.superadmin.lastName,
      email: settings.superadmin.email,
      password: settings.superadmin.password,
      roles: [role],
    });

    await userRepo.save(newUser);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

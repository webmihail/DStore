import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { RequestWithUserDTO } from '../dtos/user.request.dto';
import JwtAuthGuard from './jwt.auth.guard';

const PermissionGuard = (permission: string): Type<CanActivate> => {
  class PermissionGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUserDTO>();
      const user = request.user;
      const countOfMatchRolesWithPermission = user?.roles.filter(
        (role) =>
          role.permissions.filter((item) =>
            Object.values(item).includes(permission),
          ).length !== 0,
      );

      return countOfMatchRolesWithPermission.length !== 0;
    }
  }

  return mixin(PermissionGuardMixin);
};

export default PermissionGuard;

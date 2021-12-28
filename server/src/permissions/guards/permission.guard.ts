import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  mixin,
  Type,
} from '@nestjs/common';
import { RequestWithUserDTO } from '../../auth/dtos/user.request.dto';
import JwtAuthGuard from '../../auth/guards/jwt.auth.guard';

const PermissionGuard = (permissions: string[]): Type<CanActivate> => {
  class PermissionGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUserDTO>();
      const user = request.user;
      const countOfMatchRolesWithPermission = user?.roles.filter(
        (role) =>
          role.permissions.filter((item) => permissions.includes(item.name))
            .length !== 0,
      );

      if (countOfMatchRolesWithPermission.length === 0) {
        throw new ForbiddenException('У вас немає прав на ці дії!');
      }

      return countOfMatchRolesWithPermission.length !== 0;
    }
  }

  return mixin(PermissionGuardMixin);
};

export default PermissionGuard;

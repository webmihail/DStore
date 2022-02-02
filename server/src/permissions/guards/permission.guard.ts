import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permission.decorator';
import { RequestWithUserDTO } from '../../auth/dtos/user.request.dto';

@Injectable()
class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredPermissions = this.reflector.getAllAndOverride(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest<RequestWithUserDTO>();
    const user = request.user;

    const isHasPermissionAccess = user?.roles.some((role) =>
      role.permissions.some((item) => requiredPermissions.includes(item.name)),
    );

    if (!isHasPermissionAccess) {
      throw new ForbiddenException('You have no permissions to these actions!');
    }

    return isHasPermissionAccess;
  }
}

export default PermissionGuard;

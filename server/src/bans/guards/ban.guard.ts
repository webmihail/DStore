import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { RequestWithUserDTO } from 'src/auth/dtos/user.request.dto';

@Injectable()
export class BanGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request: RequestWithUserDTO = context.switchToHttp().getRequest();

    if (request.user?.ban && request.user.ban.isBanned) {
      throw new ForbiddenException('Ви були заблоковані адміністратором.');
    }

    return true;
  }
}

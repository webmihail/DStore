import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { RequestWithUserDTO } from '../dtos/user.request.dto';

@Injectable()
export class EmailConfirmationGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request: RequestWithUserDTO = context.switchToHttp().getRequest();

    if (!request.user?.isEmailConfirmed) {
      throw new UnauthorizedException('Вам потрібно підтвердити email');
    }

    return true;
  }
}

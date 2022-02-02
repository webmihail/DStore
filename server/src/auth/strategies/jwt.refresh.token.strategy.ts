import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { TokenPayloadDTO } from '../dtos/token.payload.dto';
import settings from 'settings';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: settings.jwtProps.refreshSecret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayloadDTO) {
    const refreshToken = request.cookies?.Refresh;
    const user = this.userService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.userId,
    );

    if (!user) {
      throw new UnauthorizedException(
        'User with valid refresh token not found',
      );
    }

    return user;
  }
}

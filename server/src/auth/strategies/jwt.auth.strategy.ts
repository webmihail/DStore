import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { TokenPayloadDTO } from '../dtos/token.payload.dto';
import settings from 'settings';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: settings.jwtProps.accessSecret,
    });
  }

  async validate(payload: TokenPayloadDTO) {
    return this.userService.getById(payload.userId);
  }
}

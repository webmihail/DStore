import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserEntity } from 'src/users/entity/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalAuthenticationStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<UserEntity | null> {
    const user = await this.authService.getAuthenticatedUser(email, password);
    if (!user) {
      throw new UnauthorizedException('There is no user with this Email!');
    }

    return user;
  }
}

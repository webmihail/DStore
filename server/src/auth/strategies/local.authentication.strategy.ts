import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserDTO } from 'src/users/dtos/user.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalAuthenticationStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<UserDTO | null> {
    const user = await this.authService.getAuthenticatedUser(email, password);
    if (!user)
      throw new UnauthorizedException('User login or password does not mutch');

    return user;
  }
}

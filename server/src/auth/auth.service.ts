import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import settings from 'settings';
import { UserDTO } from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/users.service';
import { TokenPayloadDTO } from './dtos/token.payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async getAuthenticatedUser(
    email: string,
    password: string,
  ): Promise<UserDTO> {
    try {
      const user = await this.usersService.getUserByEmail(email);
      await this.verifyPassword(password, user.password);
      delete user.password;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  getCookieWithJwtAccessToken(userId: string) {
    const payload: TokenPayloadDTO = { userId };
    const token = this.jwtService.sign(payload, {
      secret: settings.jwtProps.accessSecret,
      expiresIn: settings.jwtProps.accessExpirationTime,
    });

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${settings.jwtProps.accessExpirationTime}`;
  }

  getCookieWithJwtRefreshToken(userId: string) {
    const payload: TokenPayloadDTO = { userId };
    const token = this.jwtService.sign(payload, {
      secret: settings.jwtProps.refreshSecret,
      expiresIn: settings.jwtProps.refreshExpirationTime,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${settings.jwtProps.refreshExpirationTime}`;

    return {
      cookie,
      token,
    };
  }

  getCookieForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}

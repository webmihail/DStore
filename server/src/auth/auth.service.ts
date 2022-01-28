import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import settings from 'settings';
import { EmailService } from 'src/email/email.service';
import { UserEntity } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { TokenPayloadDTO } from './dtos/token.payload.dto';
import { VerificationTokenPayloadDTO } from './dtos/verification.token.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly emailService: EmailService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async getAuthenticatedUser(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.usersService.getUserByEmail(email);

    if (user) await this.verifyPassword(password, user.password);

    return user;
  }

  async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException(
        'Невірно набраний пароль',
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

  public sendEmailVerificationLink(email: string) {
    const payload: VerificationTokenPayloadDTO = { email };
    const token = this.jwtService.sign(payload, {
      secret: settings.jwtProps.verificationSecret,
      expiresIn: settings.jwtProps.verificationExpirationTime,
    });

    const url = `${settings.email.confirmationUrl}?token=${token}`;

    const text = `Ласкаво просимо до нашого магазину. Для підтвердження вашого email перейдіть за цим посиланням: ${url}`;

    return this.emailService.sendMail({
      to: email,
      subject: 'Підтвердження email',
      text,
    });
  }

  public async decodeEmailConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: settings.jwtProps.verificationSecret,
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException(
          'Срок дії токену підтвердження email закінчився',
        );
      }
      throw new BadRequestException('Невірний токен підтвердження');
    }
  }

  public async confirmEmail(email: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Ваш email успішно підтвердженно');
    }
    await this.usersService.markEmailAsConfirmed(email);
  }

  public async resendConfirmationLink(userId: string) {
    const user = await this.usersService.getById(userId);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Ваш email успішно підтвердженно');
    }
    await this.sendEmailVerificationLink(user.email);
  }
}

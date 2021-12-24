import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import settings from 'settings';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthStrategy } from './strategies/jwt.auth.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt.refresh.token.strategy';
import { LocalAuthenticationStrategy } from './strategies/local.authentication.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt-auth',
    }),
    JwtModule.register({
      secret: settings.jwtProps.accessSecret,
      signOptions: { expiresIn: settings.jwtProps.accessExpirationTime },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalAuthenticationStrategy,
    JwtAuthStrategy,
    JwtRefreshTokenStrategy,
  ],
})
export class AuthModule {}

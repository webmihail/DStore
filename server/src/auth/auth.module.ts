import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import settings from 'settings';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthStrategy } from './strategies/jwt.auth.strategy';
import { LocalAuthenticationStrategy } from './strategies/local.authentication.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: settings.jwtProps.secret,
      signOptions: { expiresIn: settings.jwtProps.expirationTime },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthenticationStrategy, JwtAuthStrategy],
})
export class AuthModule {}

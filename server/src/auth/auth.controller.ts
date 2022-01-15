import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/decorators/user.decorator';
import { AuthService } from './auth.service';
import { LoginRequestDTO } from './dtos/login.request.dto';
import { LoginResponseDTO } from './dtos/login.response.dto';
import { LocalAuthGuard } from './guards/local.authentication.guard';
import { Response } from 'express';
import JwtAuthGuard from './guards/jwt.auth.guard';
import { UsersService } from 'src/users/users.service';
import JwtRefreshTokenGuard from './guards/jwt.refresh.token.guard';
import { ConfirmEmailDto } from './dtos/confirm.email.tdo';
import { UserCreateDTO } from 'src/users/dtos/user.create.dto';
import { BanGuard } from 'src/bans/guards/ban.guard';
import { UserEntity } from 'src/users/entity/user.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    public readonly authService: AuthService,
    public readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Post('registration')
  async createUser(@Body() data: UserCreateDTO): Promise<UserEntity> {
    await this.authService.sendEmailVerificationLink(data.email);
    return await this.usersService.create(data);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: LoginResponseDTO })
  @ApiBody({ type: LoginRequestDTO })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(
    @User() user: UserEntity,
    @Res() response: Response,
  ): Promise<Response<UserEntity>> {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
    );
    const refreshTokenCookie = this.authService.getCookieWithJwtRefreshToken(
      user.id,
    );

    const updatedUser = await this.usersService.setCurrentRefreshToken(
      refreshTokenCookie.token,
      user.id,
    );

    response.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie.cookie,
    ]);

    return response.send(updatedUser);
  }

  @ApiOperation({ summary: 'Refresh user token' })
  @ApiResponse({ status: 200, type: LoginResponseDTO })
  @UseGuards(JwtRefreshTokenGuard)
  @Post('refresh')
  refresh(@User() user: UserEntity, @Res() response: Response) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
    );

    response.setHeader('Set-Cookie', accessTokenCookie);
    return response.send(user);
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@User() user: UserEntity, @Res() response: Response) {
    await this.usersService.removeRefreshToken(user.id);
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @ApiOperation({ summary: 'Confirm user email' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Post('confirm')
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.authService.decodeEmailConfirmationToken(
      confirmationData.token,
    );
    await this.authService.confirmEmail(email);
  }

  @ApiOperation({ summary: 'Resend confirmation link' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard, BanGuard)
  @Post('resend-confirmation-link')
  async resendConfirmationLink(@User() user: UserEntity) {
    await this.authService.resendConfirmationLink(user.id);
  }
}

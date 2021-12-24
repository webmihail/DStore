import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { UserDTO } from 'src/users/dtos/user.dto';
import { AuthService } from './auth.service';
import { LoginRequestDTO } from './dtos/login.request.dto';
import { LoginResponseDTO } from './dtos/login.response.dto';
import { LocalAuthGuard } from './guards/local.authentication.guard';
import { Response } from 'express';
import JwtAuthGuard from './guards/jwt.auth.guard';
import PermissionGuard from './guards/permission.guard';
import { Permissions } from 'src/permissions/constants';
import { UsersService } from 'src/users/users.service';
import JwtRefreshTokenGuard from './guards/jwt.refresh.token.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    public readonly authService: AuthService,
    public readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: LoginResponseDTO })
  @ApiBody({ type: LoginRequestDTO })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@User() user: UserDTO, @Res() response: Response): Promise<any> {
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
  refresh(@User() user: UserDTO, @Res() response: Response) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
    );

    response.setHeader('Set-Cookie', accessTokenCookie);
    return response.send(user);
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard(Permissions.SubscriptionFullManagement))
  @Post('logout')
  async logOut(@User() user: UserDTO, @Res() response: Response) {
    await this.usersService.removeRefreshToken(user.id);
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }
}

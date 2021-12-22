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

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(public readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: LoginResponseDTO })
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginRequestDTO })
  @Post('login')
  async logIn(@User() user: UserDTO, @Res() response: Response): Promise<any> {
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    return response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard(Permissions.SubscriptionFullManagement))
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200 })
  @Post('logout')
  async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }
}

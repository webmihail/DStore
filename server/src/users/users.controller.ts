import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { UserEditDTO } from './dtos/user.edit.dto';
import { UserDTO } from './dtos/user.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';
import JwtAuthGuard from 'src/auth/guards/jwt.auth.guard';
import PermissionGuard from 'src/permissions/guards/permission.guard';
import { Permissions } from 'src/permissions/constants';
import { BanGuard } from 'src/bans/guards/ban.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserDTO] })
  @UseGuards(PermissionGuard([Permissions.SubscriptionFullManagement]))
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(): Promise<UserDTO[]> {
    return await this.userService.getAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: UserDTO })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserDTO> {
    return await this.userService.getById(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UserEditDTO,
  ): Promise<UserDTO> {
    return await this.userService.update(id, data);
  }

  @ApiOperation({ summary: 'Delete user' })
  @UseGuards(PermissionGuard([Permissions.SubscriptionFullManagement]))
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.delete(id);
  }

  @ApiOperation({ summary: 'Add role to user' })
  @ApiResponse({ status: 200, type: UserDTO })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionRoleManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':userId/add-role/:roleId')
  async addRoleFromUser(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ): Promise<UserDTO> {
    return await this.userService.addRole(userId, roleId);
  }

  @ApiOperation({ summary: 'Delete role from user' })
  @ApiResponse({ status: 200, type: UserDTO })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionRoleManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':userId/delete-role/:roleId')
  async deleteRoleFromUser(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ): Promise<UserDTO> {
    return await this.userService.deleteRole(userId, roleId);
  }

  @ApiOperation({ summary: 'Add ban to user' })
  @ApiResponse({ status: 200, type: UserDTO })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionBanManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':userId/add-ban/:banId')
  async addBanFromUser(
    @Param('userId') userId: string,
    @Param('banId') banId: string,
  ): Promise<UserDTO> {
    return await this.userService.addBan(userId, banId);
  }

  @ApiOperation({ summary: 'Delete ban from user' })
  @ApiResponse({ status: 200, type: UserDTO })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionBanManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':userId/delete-ban')
  async deleteBanFromUser(@Param('userId') userId: string): Promise<UserDTO> {
    return await this.userService.deleteBan(userId);
  }
}

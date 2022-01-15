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
import { UserEntity } from './entity/user.entity';
import { UsersService } from './users.service';
import JwtAuthGuard from 'src/auth/guards/jwt.auth.guard';
import { BanGuard } from 'src/bans/guards/ban.guard';
import { PermissionTypes } from 'src/permissions/constants';
import { Permissions } from 'src/permissions/decorators/permission.decorator';
import PermissionGuard from 'src/permissions/guards/permission.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  @Permissions(PermissionTypes.SubscriptionFullManagement)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: UserEntity })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.getById(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: UserEntity })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UserEditDTO,
  ): Promise<UserEntity> {
    return await this.userService.update(id, data);
  }

  @ApiOperation({ summary: 'Delete user' })
  @Permissions(PermissionTypes.SubscriptionFullManagement)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.delete(id);
  }

  @ApiOperation({ summary: 'Add role to user' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionRoleManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Patch(':userId/add-role/:roleId')
  async addRoleFromUser(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ): Promise<UserEntity> {
    return await this.userService.addRole(userId, roleId);
  }

  @ApiOperation({ summary: 'Delete role from user' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionRoleManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Patch(':userId/delete-role/:roleId')
  async deleteRoleFromUser(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ): Promise<UserEntity> {
    return await this.userService.deleteRole(userId, roleId);
  }

  @ApiOperation({ summary: 'Add ban to user' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionRoleManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Patch(':userId/add-ban/:banId')
  async addBanToUser(
    @Param('userId') userId: string,
    @Param('banId') banId: string,
  ): Promise<UserEntity> {
    return await this.userService.addBan(userId, banId);
  }

  @ApiOperation({ summary: 'Delete ban from user' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionRoleManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Patch(':userId/delete-ban')
  async deleteBanFromUser(
    @Param('userId') userId: string,
  ): Promise<UserEntity> {
    return await this.userService.deleteBan(userId);
  }
}

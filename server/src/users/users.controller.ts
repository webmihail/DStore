import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { UserCreateDTO } from './dtos/user.create.dto';
import { UserEditDTO } from './dtos/user.edit.dto';
import { UserDTO } from './dtos/user.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserDTO] })
  @Get()
  async getAllUsers(): Promise<UserDTO[]> {
    return await this.userService.getAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: UserDTO })
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserDTO> {
    return await this.userService.getById(id);
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 200, type: UserDTO })
  @Post()
  async createUser(@Body() data: UserCreateDTO): Promise<UserDTO> {
    return await this.userService.create(data);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UserEditDTO,
  ): Promise<UserDTO> {
    return await this.userService.update(id, data);
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.delete(id);
  }

  @ApiOperation({ summary: 'Add role to user' })
  @ApiResponse({ status: 200, type: UserDTO })
  @Patch(':userId/add-role/:roleId')
  async addRoleFromUser(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ): Promise<UserDTO> {
    return await this.userService.addRole(userId, roleId);
  }

  @ApiOperation({ summary: 'Delete role from user' })
  @ApiResponse({ status: 200, type: UserDTO })
  @Patch(':userId/delete-role/:roleId')
  async deleteRoleFromUser(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ): Promise<UserDTO> {
    return await this.userService.deleteRole(userId, roleId);
  }
}

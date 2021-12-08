import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { UserDTO } from './dtos/user.dto';
import { EditUserDTO } from './dtos/user.edit.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
@UsePipes(new ValidationPipe())
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async getAllUsers(): Promise<UserDTO[]> {
    return await this.userService.getAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserDTO> {
    return await this.userService.getById(id);
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  async createUser(@Body() data: UserDTO): Promise<UserDTO> {
    return await this.userService.create(data);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() data: EditUserDTO,
  ): Promise<UserDTO> {
    const user = await this.userService.update(id, data);

    return user;
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.delete(id);
  }
}

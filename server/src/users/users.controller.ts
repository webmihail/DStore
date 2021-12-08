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
import { DeleteResult } from 'typeorm';
import { UserDTO } from './dtos/user.dto';
import { EditUserDTO } from './dtos/user.edit.dto';
import { UsersService } from './users.service';

@Controller('users')
@UsePipes(new ValidationPipe())
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<UserDTO[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserDTO> {
    return await this.userService.getById(id);
  }

  @Post()
  async createUser(@Body() data: UserDTO): Promise<UserDTO> {
    return await this.userService.create(data);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() data: EditUserDTO,
  ): Promise<UserDTO> {
    const user = await this.userService.update(id, data);

    return user;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.delete(id);
  }
}

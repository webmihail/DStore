import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserDTO } from './dtos/user.dto';
import { EditUserDTO } from './dtos/user.edit.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<UserDTO[]> {
    return await this.userRepository.find();
  }

  async getById(id: number): Promise<UserDTO> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('user does not exists');

    return user;
  }

  async create(data: UserDTO): Promise<UserDTO> {
    const userExist = await this.userRepository.findOne({ email: data.email });
    if (userExist)
      throw new NotFoundException('User already registered with email');

    const newUser = await this.userRepository.create(data);
    const user = await this.userRepository.save(newUser);

    delete user.password;
    return user;
  }

  async update(id: number, data: EditUserDTO): Promise<UserDTO> {
    const user = await this.getById(id);
    const editUser = Object.assign(user, data);
    const updatedUser = await this.userRepository.save(editUser);

    delete updatedUser.password;
    return updatedUser;
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}

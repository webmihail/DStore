import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { DeleteResult, Repository } from 'typeorm';
import { UserCreateDTO } from './dtos/user.create.dto';
import { UserEditDTO } from './dtos/user.edit.dto';
import { UserDTO } from './dtos/user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async getAll(): Promise<UserDTO[]> {
    return await this.userRepository.find({
      relations: ['roles'],
    });
  }

  async getById(id: number): Promise<UserDTO> {
    const user = await this.userRepository.findOne(id, {
      relations: ['roles'],
    });
    if (!user) throw new NotFoundException('user does not exists');

    return user;
  }

  async create(data: UserCreateDTO): Promise<UserDTO> {
    const userExist = await this.userRepository.findOne({ email: data.email });
    if (userExist)
      throw new NotFoundException('User already registered with email');

    const role = await this.rolesService.getByValue('PERSONE');

    const newUser = await this.userRepository.create(data);
    newUser.roles = [role];
    const user = await this.userRepository.save(newUser);

    delete user.password;
    return user;
  }

  async update(id: number, data: UserEditDTO): Promise<UserDTO> {
    const user = await this.getById(id);
    const editUser = Object.assign(user, data);
    const updatedUser = await this.userRepository.save(editUser);

    delete updatedUser.password;
    return updatedUser;
  }

  async addRole(userId: number, roleId: number): Promise<UserDTO> {
    const editUser = await this.getById(userId);
    const equalRoles = editUser.roles.filter((role) => role.id === roleId);

    if (equalRoles.length === 0) {
      const role = await this.rolesService.getById(roleId);
      editUser.roles.push(role);
    }

    const updatedUser = await this.userRepository.save(editUser);

    delete updatedUser.password;
    return updatedUser;
  }

  async deleteRole(userId: number, roleId: number): Promise<UserDTO> {
    const editUser = await this.getById(userId);
    const editRoles = editUser.roles.filter((role) => role.id !== roleId);
    editUser.roles = editRoles;
    const updatedUser = await this.userRepository.save(editUser);

    delete updatedUser.password;
    return updatedUser;
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}

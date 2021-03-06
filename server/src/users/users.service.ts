import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { DeleteResult, Repository } from 'typeorm';
import { UserCreateDTO } from './dtos/user.create.dto';
import { UserEditDTO } from './dtos/user.edit.dto';
import { UserEntity } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { BansService } from 'src/bans/bans.service';
import { BasketsService } from 'src/baskets/baskets.service';
import { WishlistsService } from 'src/wishlists/wishlists.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly rolesService: RolesService,
    private readonly bansService: BansService,
    private readonly basketsService: BasketsService,
    private readonly wishlistsService: WishlistsService,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async getById(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(id, {
      relations: ['roles', 'roles.permissions', 'ban'],
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where({ email })
      .addSelect(['user.password'])
      .getOne();
  }

  async create(data: UserCreateDTO): Promise<UserEntity> {
    const userExist = await this.usersRepository.findOne({ email: data.email });
    if (userExist)
      throw new BadRequestException('Such an email already exists');

    let role = await this.rolesService.getByValue('Persone');

    if (!role) {
      role = await this.rolesService.create({
        name: 'Persone',
        description: 'Role for all users',
      });
    }

    const newUser = await this.usersRepository.create(data);
    newUser.roles = [role];
    const user = await this.usersRepository.save(newUser);
    await this.basketsService.create(user);
    await this.wishlistsService.create(user);

    delete user.currentHashedRefreshToken;
    delete user.password;

    return user;
  }

  async update(id: string, data: UserEditDTO): Promise<UserEntity> {
    const user = await this.getById(id);
    const editUser = Object.assign(user, data);
    const updatedUser = await this.usersRepository.save(editUser);

    delete updatedUser.currentHashedRefreshToken;
    delete updatedUser.password;

    return updatedUser;
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }

  async addRole(userId: string, roleId: string): Promise<UserEntity> {
    const user = await this.getById(userId);
    const equalRoles = user.roles.filter((role) => role.id === roleId);

    if (equalRoles.length === 0) {
      const role = await this.rolesService.getById(roleId);
      user.roles.push(role);
    }

    const editUser = await this.usersRepository.save(user);

    delete editUser.currentHashedRefreshToken;
    delete editUser.password;

    return editUser;
  }

  async deleteRole(userId: string, roleId: string): Promise<UserEntity> {
    const user = await this.getById(userId);
    const editRoles = user.roles.filter((role) => role.id !== roleId);
    user.roles = editRoles;
    const editUser = await this.usersRepository.save(user);

    delete editUser.currentHashedRefreshToken;
    delete editUser.password;

    return editUser;
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    const updateUser = await this.update(userId, {
      currentHashedRefreshToken,
    });

    return updateUser;
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where({ id: userId })
      .addSelect(['user.password', 'user.currentHashedRefreshToken'])
      .getOne();

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (!isRefreshTokenMatching) {
      throw new UnauthorizedException('Refresh token not match!');
    }

    delete user.currentHashedRefreshToken;
    delete user.password;

    return user;
  }

  async removeRefreshToken(userId: string) {
    return this.usersRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }

  async markEmailAsConfirmed(email: string) {
    return this.usersRepository.update(
      { email },
      {
        isEmailConfirmed: true,
      },
    );
  }

  async addBan(userId: string, banId: string): Promise<UserEntity> {
    const user = await this.getById(userId);
    const ban = await this.bansService.getById(banId);

    user.ban = ban;

    const editUser = await this.usersRepository.save(user);

    delete editUser.currentHashedRefreshToken;
    delete editUser.password;

    return editUser;
  }

  async deleteBan(userId: string): Promise<UserEntity> {
    const user = await this.getById(userId);
    user.ban = null;
    const editUser = await this.usersRepository.save(user);

    delete editUser.currentHashedRefreshToken;
    delete editUser.password;

    return editUser;
  }
}

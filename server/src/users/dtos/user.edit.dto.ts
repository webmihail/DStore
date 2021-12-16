import { PartialType } from '@nestjs/swagger';
import { UserCreateDTO } from './user.create.dto';

export class UserEditDTO extends PartialType(UserCreateDTO) {}

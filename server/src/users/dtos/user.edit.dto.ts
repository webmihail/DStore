import { UserDTO } from './user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class EditUserDTO extends PartialType(UserDTO) {}

import { PartialType } from '@nestjs/swagger';
import { RoleCreateDTO } from './role.create.dto';

export class RoleEditDTO extends PartialType(RoleCreateDTO) {}

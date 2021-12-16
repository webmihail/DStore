import { PartialType } from '@nestjs/swagger';
import { PermissionCreateDTO } from './permission.create.dto';

export class PermissionEditDTO extends PartialType(PermissionCreateDTO) {}

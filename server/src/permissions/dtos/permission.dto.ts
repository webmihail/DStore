import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
} from 'class-validator';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { Permissions } from '../constants';
import { permissionTypeMatchExpression } from '../utils/permissionTypeMatchExpression';

export class PermissionDTO extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @IsOptional()
  @IsUUID()
  id: string;

  @ApiProperty({ name: 'name', enum: Permissions })
  @IsString()
  @IsEnum(Permissions, { each: true })
  @Matches(permissionTypeMatchExpression(Permissions))
  name: Permissions;

  @ApiProperty({
    example: 'description for permission',
    description: 'Permission description',
  })
  @IsString()
  @MaxLength(255)
  description: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { PermissionDTO } from 'src/permissions/dtos/permission.dto';

export class RoleDTO extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @IsOptional()
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  @IsString()
  @MaxLength(255)
  description: string;

  @ApiProperty({ example: [], description: 'Role permissions' })
  @IsArray()
  permissions: PermissionDTO[];
}

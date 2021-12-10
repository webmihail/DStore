import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Matches, MaxLength } from 'class-validator';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { RolesTypes } from '../constants';
import { roleTypeMatchExpression } from '../utils/roleTypeMatchExpression';

export class RoleCreateDTO extends GenericEntity {
  @ApiProperty({ name: 'type', enum: RolesTypes })
  @IsString()
  @IsEnum(RolesTypes, { each: true })
  @Matches(roleTypeMatchExpression(RolesTypes))
  type: RolesTypes;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  @IsString()
  @MaxLength(255)
  description: string;
}

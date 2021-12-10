import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { RolesTypes } from '../constants';
import { roleTypeMatchExpression } from '../utils/roleTypeMatchExpression';

export class RoleDTO extends GenericEntity {
  @ApiProperty({ example: '1', description: 'unique idetificator' })
  @IsOptional()
  @IsNumber()
  id: number;

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

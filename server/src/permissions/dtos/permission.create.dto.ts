import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Matches, MaxLength } from 'class-validator';
import { PermissionTypes } from '../constants';
import { enumTypeMatchExpression } from '../../common/utils/enumTypeMatchExpression';

export class PermissionCreateDTO {
  @ApiProperty({ name: 'name', enum: PermissionTypes })
  @IsString()
  @IsEnum(PermissionTypes, { each: true })
  @Matches(enumTypeMatchExpression(PermissionTypes))
  name: PermissionTypes;

  @ApiProperty({
    example: 'description for permission',
    description: 'Permission description',
  })
  @IsString()
  @MaxLength(255)
  description: string;
}

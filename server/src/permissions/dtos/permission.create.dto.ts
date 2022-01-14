import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Matches, MaxLength } from 'class-validator';
import { Permissions } from '../constants';
import { enumTypeMatchExpression } from '../../common/utils/enumTypeMatchExpression';

export class PermissionCreateDTO {
  @ApiProperty({ name: 'name', enum: Permissions })
  @IsString()
  @IsEnum(Permissions, { each: true })
  @Matches(enumTypeMatchExpression(Permissions))
  name: Permissions;

  @ApiProperty({
    example: 'description for permission',
    description: 'Permission description',
  })
  @IsString()
  @MaxLength(255)
  description: string;
}

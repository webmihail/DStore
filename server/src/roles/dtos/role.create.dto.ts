import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class RoleCreateDTO {
  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  @IsString()
  @MaxLength(255)
  description: string;
}

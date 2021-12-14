import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { RoleDTO } from 'src/roles/dtos/role.dto';

export class UserDTO extends GenericEntity {
  @ApiProperty({ example: '1', description: 'unique idetificator' })
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Mihail', description: 'User first name' })
  @IsString()
  @MaxLength(255)
  firstName: string;

  @ApiProperty({ example: 'Ivanov', description: 'User last name' })
  @IsString()
  @MaxLength(255)
  lastName: string;

  @ApiProperty({ example: 'ivanov@gmail.com', description: 'user email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'S1234ghgh', description: 'User password' })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;

  @ApiProperty({ example: [], description: 'User roles' })
  @IsArray()
  roles: RoleDTO[];
}

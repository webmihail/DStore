import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BanDTO } from 'src/bans/dtos/ban.dto';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { RoleDTO } from 'src/roles/dtos/role.dto';

export class UserDTO extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @IsOptional()
  @IsUUID()
  id: string;

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

  @ApiProperty({ example: {}, description: 'User ban' })
  @IsObject()
  ban: BanDTO;

  @IsString()
  @IsOptional()
  currentHashedRefreshToken?: string;

  @IsBoolean()
  @IsOptional()
  isEmailConfirmed?: boolean;
}

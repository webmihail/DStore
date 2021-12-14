import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { GenericEntity } from 'src/common/generic/generic.entity';

class UserEdit extends GenericEntity {
  @ApiProperty({ example: 'Mihail', description: 'User first name' })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  firstName: string;

  @ApiProperty({ example: 'Ivanov', description: 'User last name' })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  lastName: string;

  @ApiProperty({ example: 'ivanov@gmail.com', description: 'user email' })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ example: 'S1234ghgh', description: 'User password' })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @IsOptional()
  password: string;
}

export class UserEditDTO extends PartialType(UserEdit) {}

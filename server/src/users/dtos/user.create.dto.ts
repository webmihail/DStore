import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserCreateDTO {
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

  @ApiProperty({ example: '+380990000000', description: 'user phone' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: 'S1234ghgh', description: 'User password' })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;

  @IsString()
  @IsOptional()
  currentHashedRefreshToken?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class LoginRequestDTO {
  @ApiProperty({
    example: 'ivanov@gmail.com',
    description: 'User email',
  })
  @IsString()
  @MaxLength(255)
  email: string;

  @ApiProperty({
    example: 'S1234ghgh',
    description: 'User password',
  })
  @IsString()
  @MaxLength(255)
  password: string;
}

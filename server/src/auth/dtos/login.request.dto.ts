import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class LoginRequestDTO {
  @ApiProperty({
    example: 'blabla@gmail.com',
    description: 'User email',
  })
  @IsString()
  @MaxLength(255)
  email: string;

  @ApiProperty({
    example: 'dasdsa123123',
    description: 'User password',
  })
  @IsString()
  @MaxLength(255)
  password: string;
}

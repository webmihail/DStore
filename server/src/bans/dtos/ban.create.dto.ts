import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class BanCreateDTO {
  @ApiProperty({
    example: 'Indecent behavior',
    description: 'User ban reason',
  })
  @IsString()
  @MaxLength(255)
  banReason: string;
}

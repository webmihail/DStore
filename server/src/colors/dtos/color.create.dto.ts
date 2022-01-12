import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ColorCreateDTO {
  @ApiProperty({
    example: 'Светло-бежевый',
    description: 'Color name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '#FBCEB1',
    description: 'Color value',
  })
  @IsString()
  value: string;
}

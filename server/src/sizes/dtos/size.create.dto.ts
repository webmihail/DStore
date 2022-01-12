import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SizeCreateDTO {
  @ApiProperty({
    example: 'Нижняя одежда',
    description: 'Product size type',
  })
  @IsString()
  type: string;

  @ApiProperty({
    example: 'XL',
    description: 'Product size name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Обхват груди - 130, обхват бедра - 60',
    description: 'Product size description',
  })
  @IsString()
  description: string;
}

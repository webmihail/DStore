import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CategoryCreateDTO {
  @ApiProperty({
    example: 'Man clothes',
    description: 'category name',
  })
  @IsString()
  name: string;
}

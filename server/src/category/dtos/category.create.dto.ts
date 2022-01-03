import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CategoryCreateDTO {
  @ApiProperty({
    example: 'Man clothes',
    description: 'category name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'https://www.fsdfdsf.fdfs',
    description: 'category icon url',
  })
  @IsString()
  @IsOptional()
  iconUrl?: string;
}

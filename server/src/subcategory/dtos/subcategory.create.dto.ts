import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SubcategoryCreateDTO {
  @ApiProperty({
    example: 'T-shirt',
    description: 'subcategory name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'https://www.fsdfdsf.fdfs',
    description: 'subcategory icon url',
  })
  @IsString()
  @IsOptional()
  iconUrl?: string;
}

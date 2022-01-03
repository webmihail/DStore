import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';
import { SubcategoryDTO } from 'src/subcategory/dtos/subcategory.dto';

export class CategoryDTO {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @IsOptional()
  @IsUUID()
  id: string;

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

  @ApiProperty({ example: [], description: 'Category subcategories' })
  @IsArray()
  subcategories: SubcategoryDTO[];
}

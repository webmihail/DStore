import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class SubcategoryDTO {
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
}
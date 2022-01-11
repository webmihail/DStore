import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class ProductInfoCreateDTO {
  @ApiProperty({
    example: 'Классические плотные и элегантные джинсы',
    description: 'Product info title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Тип ткани: коттон, размер: L',
    description: 'Product info description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: true,
    description: 'Is product exist in stock',
  })
  @IsBoolean()
  inStock: boolean;

  @ApiProperty({
    example: ['http://fjsdjflsdf.com/image', 'http://dwewrwer.com/image'],
    description: 'Array of images url',
  })
  @IsArray()
  images: string[];

  @ApiProperty({
    example: 10,
    description: 'Count of product in stock',
  })
  @IsNumber()
  count: number;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { GenericEntity } from 'src/common/generic/generic.entity';

export class ProductDTO extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @IsOptional()
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Футболка Uniq', description: 'Product name' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: 199, description: 'Product price' })
  @IsNumber()
  price: number;
}

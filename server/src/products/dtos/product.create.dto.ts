import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';
import { GenericEntity } from 'src/common/generic/generic.entity';

export class ProductCreateDTO extends GenericEntity {
  @ApiProperty({ example: 'Футболка Uniq', description: 'Product name' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: 199, description: 'Product price' })
  @IsNumber()
  price: number;
}

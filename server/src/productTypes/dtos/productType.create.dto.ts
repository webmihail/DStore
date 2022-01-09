import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { GenericEntity } from 'src/common/generic/generic.entity';

export class ProductTypeCreateDTO extends GenericEntity {
  @ApiProperty({
    example: 'Класссические джинсы',
    description: 'Product type description',
  })
  @IsString()
  @MaxLength(255)
  name: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { GenericEntity } from 'src/common/generic/generic.entity';

export class BrandCreateDTO extends GenericEntity {
  @ApiProperty({
    example: 'Disquired',
    description: 'Brand type name',
  })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: 'USA',
    description: 'Brand country name',
  })
  @IsString()
  @MaxLength(255)
  country: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { GenericEntity } from 'src/common/generic/generic.entity';

export class RatingCreateDTO extends GenericEntity {
  @ApiProperty({
    example: 3,
    description: 'Rate',
  })
  @IsNumber()
  rate: number;
}

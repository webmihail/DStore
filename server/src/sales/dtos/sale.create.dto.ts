import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { GenericEntity } from 'src/common/generic/generic.entity';

export class SaleCreateDTO extends GenericEntity {
  @ApiProperty({ example: 50, description: 'Sale discount' })
  @IsNumber()
  discount: number;
}

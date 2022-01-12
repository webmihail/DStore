import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { GenericEntity } from 'src/common/generic/generic.entity';

export class PieceCreateDTO extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @IsString()
  productId: string;

  @ApiProperty({
    example: 1,
    description: 'count of piece',
  })
  @IsNumber()
  count: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { GenericEntity } from 'src/common/generic/generic.entity';

export class BrandDTO extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @IsOptional()
  @IsUUID()
  id: string;

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

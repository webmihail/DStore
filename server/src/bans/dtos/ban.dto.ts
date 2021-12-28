import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { GenericEntity } from 'src/common/generic/generic.entity';

export class BanDTO extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @IsOptional()
  @IsUUID()
  id: string;

  @IsBoolean()
  @IsOptional()
  isBanned: boolean;

  @ApiProperty({
    example: 'Indecent behavior',
    description: 'User ban reason',
  })
  @IsString()
  @MaxLength(255)
  banReason: string;
}

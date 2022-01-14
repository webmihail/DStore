import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsPhoneNumber, IsString, Matches } from 'class-validator';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { enumTypeMatchExpression } from 'src/common/utils/enumTypeMatchExpression';
import { Posts } from '../constants';

export class DeliveryCreateDTO extends GenericEntity {
  @ApiProperty({ name: 'post', enum: Posts })
  @IsString()
  @IsEnum(Posts, { each: true })
  @Matches(enumTypeMatchExpression(Posts))
  post: Posts;

  @ApiProperty({
    example: 'Dnipro',
    description: 'City name',
  })
  @IsString()
  city: string;

  @ApiProperty({
    example: '49000',
    description: 'City index',
  })
  @IsString()
  index: string;

  @ApiProperty({
    example: 'Dnipropetrovska',
    description: 'Area name',
  })
  @IsString()
  area: string;

  @ApiProperty({
    example: '+380990000000',
    description: 'Phone number',
  })
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'Отделение 3',
    description: 'Delivery description',
  })
  @IsString()
  description: string;
}

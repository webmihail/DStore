import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { ProductInfoEntity } from 'src/productsInfo/entity/productInfo.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'colors' })
@Unique(['id'])
export class ColorEntity extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Светло-бежевый',
    description: 'Color name',
  })
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({
    example: '#FBCEB1',
    description: 'Color value',
  })
  @Column({ name: 'value', type: 'varchar', length: 255 })
  value: string;

  @OneToMany(
    () => ProductInfoEntity,
    (productInfo: ProductInfoEntity) => productInfo.color,
    {
      cascade: true,
    },
  )
  productsInfo: ProductInfoEntity[];
}

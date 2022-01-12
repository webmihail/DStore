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

@Entity({ name: 'sizes' })
@Unique(['id'])
export class SizeEntity extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Нижняя одежда',
    description: 'Product size type',
  })
  @Column({ name: 'type', type: 'varchar', length: 255 })
  type: string;

  @ApiProperty({
    example: 'XL',
    description: 'Product size name',
  })
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({
    example: 'Обхват груди - 130, обхват бедра - 60',
    description: 'Product size description',
  })
  @Column({ name: 'description', type: 'varchar', length: 255 })
  description: string;

  @OneToMany(
    () => ProductInfoEntity,
    (productInfo: ProductInfoEntity) => productInfo.size,
    {
      cascade: true,
    },
  )
  productsInfo: ProductInfoEntity[];
}

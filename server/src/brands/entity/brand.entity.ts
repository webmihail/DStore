import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { ProductEntity } from 'src/products/entity/product.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'brands' })
@Unique(['id'])
export class BrandEntity extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Disquired',
    description: 'Brand type name',
  })
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({
    example: 'USA',
    description: 'Brand country name',
  })
  @Column({ name: 'country', type: 'varchar', length: 255 })
  country: string;

  @OneToMany(() => ProductEntity, (product: ProductEntity) => product.brand, {
    cascade: true,
  })
  products: ProductEntity[];
}

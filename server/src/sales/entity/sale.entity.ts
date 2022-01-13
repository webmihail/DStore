import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { ColumnNumericTransformer } from 'src/common/utils/ColumnNumericTransformer';
import { ProductEntity } from 'src/products/entity/product.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'sales' })
@Unique(['id'])
export class SaleEntity extends GenericEntity {
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
  @Column('numeric', {
    transformer: new ColumnNumericTransformer(),
  })
  discount: number;

  @OneToMany(() => ProductEntity, (product: ProductEntity) => product.sale, {
    cascade: true,
  })
  products: ProductEntity[];
}

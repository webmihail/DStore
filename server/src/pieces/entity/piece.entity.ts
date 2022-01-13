import { ApiProperty } from '@nestjs/swagger';
import { BasketEntity } from 'src/baskets/entity/basket.entity';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { ColumnNumericTransformer } from 'src/common/utils/ColumnNumericTransformer';
import { OrderEntity } from 'src/orders/entity/order.entity';
import { ProductEntity } from 'src/products/entity/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'pieces' })
@Unique(['id'])
export class PieceEntity extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 1,
    description: 'count of piece',
  })
  @Column('numeric', {
    transformer: new ColumnNumericTransformer(),
  })
  count: number;

  @ApiProperty({
    example: 1200,
    description: 'price of piece',
  })
  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.pieces, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity;

  @ManyToOne(() => OrderEntity, (order: OrderEntity) => order.pieces, {
    onDelete: 'CASCADE',
  })
  order: OrderEntity;

  @ManyToOne(() => BasketEntity, (basket: BasketEntity) => basket.pieces)
  basket: BasketEntity;
}

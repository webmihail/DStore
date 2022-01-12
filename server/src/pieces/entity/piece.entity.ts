import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
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
  @Column({ name: 'count', type: 'numeric' })
  count: number;

  @ApiProperty({
    example: 1200,
    description: 'price of piece',
  })
  @Column({ name: 'price', type: 'numeric' })
  price: number;

  @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.pieces, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity;

  // @ManyToOne(() => OrderEntity, (order: OrderEntity) => order.pieces, {
  //   onDelete: 'CASCADE',
  // })
  // order: OrderEntity;
}

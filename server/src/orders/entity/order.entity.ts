import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { ColumnNumericTransformer } from 'src/common/transformers/ColumnNumericTransformer';
import { DeliveryEntity } from 'src/deliveries/entity/delivery.entity';
import { PieceEntity } from 'src/pieces/entity/piece.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'orders' })
@Unique(['id'])
export class OrderEntity extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('increment')
  code: number;

  @ApiProperty({
    example: 1,
    description: 'count of all pieces in order',
  })
  @Column('numeric', {
    transformer: new ColumnNumericTransformer(),
  })
  count: number;

  @ApiProperty({
    example: 1200,
    description: 'price of all pieces in order',
  })
  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column({ name: 'isPaid', type: 'boolean', default: false })
  isPaid: boolean;

  @OneToMany(() => PieceEntity, (piece: PieceEntity) => piece.order, {
    cascade: true,
  })
  pieces: PieceEntity[];

  @ManyToOne(
    () => DeliveryEntity,
    (delivery: DeliveryEntity) => delivery.orders,
  )
  delivery: DeliveryEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.orders)
  user: UserEntity;
}

import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { OrderEntity } from 'src/orders/entity/order.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Posts } from '../constants';

@Entity({ name: 'deliveries' })
@Unique(['id'])
export class DeliveryEntity extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ enum: Posts })
  @Column({ name: 'post', type: 'enum', enum: Posts })
  post: Posts;

  @ApiProperty({
    example: 'Dnipro',
    description: 'City name',
  })
  @Column({ name: 'city', type: 'varchar', length: 255 })
  city: string;

  @ApiProperty({
    example: '49000',
    description: 'City index',
  })
  @Column({ name: 'index', type: 'varchar', length: 255 })
  index: string;

  @ApiProperty({
    example: 'Dnipropetrovska',
    description: 'Area name',
  })
  @Column({ name: 'area', type: 'varchar', length: 255 })
  area: string;

  @ApiProperty({
    example: '+380990000000',
    description: 'Phone number',
  })
  @Column({ name: 'phone', type: 'varchar', length: 50 })
  phone: string;

  @ApiProperty({
    example: 'Отделение 3',
    description: 'Delivery description',
  })
  @Column({ name: 'description', type: 'varchar', length: 255 })
  description: string;

  @OneToMany(() => OrderEntity, (order: OrderEntity) => order.delivery, {
    cascade: true,
  })
  orders: OrderEntity[];

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.deliveries)
  user: UserEntity;
}

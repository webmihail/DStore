import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { PieceEntity } from 'src/pieces/entity/piece.entity';
import {
  Column,
  Entity,
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

  @ApiProperty({
    example: 1,
    description: 'count of all pieces in order',
  })
  @Column({ name: 'count', type: 'numeric' })
  count: number;

  @ApiProperty({
    example: 1200,
    description: 'price of all pieces in order',
  })
  @Column({ name: 'price', type: 'numeric' })
  price: number;

  @Column({ name: 'isPaid', type: 'boolean', default: false })
  isPaid: boolean;

  @OneToMany(() => PieceEntity, (piece: PieceEntity) => piece.order, {
    cascade: true,
  })
  pieces: PieceEntity[];
}

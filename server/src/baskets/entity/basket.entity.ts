import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { PieceEntity } from 'src/pieces/entity/piece.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import {
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'baskets' })
@Unique(['id'])
export class BasketEntity extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => PieceEntity, (piece: PieceEntity) => piece.basket, {
    cascade: true,
  })
  pieces: PieceEntity[];

  @OneToOne(() => UserEntity, (user: UserEntity) => user.basket)
  user: UserEntity;
}

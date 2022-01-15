import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { ColumnNumericTransformer } from 'src/common/transformers/ColumnNumericTransformer';
import { ProductEntity } from 'src/products/entity/product.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'ratings' })
@Unique(['id'])
export class RatingEntity extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 3,
    description: 'Rate',
  })
  @Column('numeric', {
    transformer: new ColumnNumericTransformer(),
  })
  rate: number;

  @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.ratings)
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.ratings)
  user: UserEntity;
}

import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { ProductEntity } from 'src/products/entity/product.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import {
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'wishlists' })
@Unique(['id'])
export class WishlistEntity extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(
    () => ProductEntity,
    (product: ProductEntity) => product.wishlist,
    {
      cascade: true,
    },
  )
  products: ProductEntity[];

  @OneToOne(() => UserEntity, (user: UserEntity) => user.wishlist)
  user: UserEntity;
}

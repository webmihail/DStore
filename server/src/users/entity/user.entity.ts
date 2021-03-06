import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { RoleEntity } from 'src/roles/entity/role.entity';
import { hash } from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BanEntity } from 'src/bans/entity/ban.entity';
import { BasketEntity } from 'src/baskets/entity/basket.entity';
import { OrderEntity } from 'src/orders/entity/order.entity';
import { DeliveryEntity } from 'src/deliveries/entity/delivery.entity';
import { CommentEntity } from 'src/comments/entity/comment.entity';
import { RatingEntity } from 'src/ratings/entity/rating.entity';
import { WishlistEntity } from 'src/wishlists/entity/wishlist.entity';

@Entity({ name: 'users' })
@Unique(['id', 'email'])
export class UserEntity extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Mihail', description: 'User first name' })
  @Column({ name: 'firstName', type: 'varchar', length: 255 })
  firstName: string;

  @ApiProperty({ example: 'Ivanov', description: 'User last name' })
  @Column({ name: 'lastName', type: 'varchar', length: 255 })
  lastName: string;

  @ApiProperty({ example: 'ivanov@gmail.com', description: 'user email' })
  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })
  email: string;

  @ApiProperty({ example: '+380990000000', description: 'user phone' })
  @Column({ name: 'phone', type: 'varchar', length: 255, nullable: false })
  phone: string;

  @ApiProperty({ example: 'S1234ghgh', description: 'User password' })
  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    name: 'currentHashedRefreshToken',
    type: 'varchar',
    length: 255,
    nullable: true,
    select: false,
  })
  currentHashedRefreshToken?: string;

  @Column({ name: 'isEmailConfirmed', type: 'boolean', default: false })
  isEmailConfirmed?: boolean;

  @OneToOne(() => BasketEntity, (basket: BasketEntity) => basket.user)
  @JoinColumn()
  basket: BasketEntity;

  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles: RoleEntity[];

  @ManyToOne(() => BanEntity, (ban: BanEntity) => ban.users)
  ban: BanEntity;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<null> {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => OrderEntity, (order: OrderEntity) => order.user, {
    cascade: true,
  })
  orders: OrderEntity[];

  @OneToMany(
    () => DeliveryEntity,
    (delivery: DeliveryEntity) => delivery.user,
    {
      cascade: true,
    },
  )
  deliveries: DeliveryEntity[];

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.user, {
    cascade: true,
  })
  comments: CommentEntity[];

  @OneToMany(() => RatingEntity, (rating: RatingEntity) => rating.user, {
    cascade: true,
  })
  ratings: RatingEntity[];

  @OneToOne(() => WishlistEntity, (wishlist: WishlistEntity) => wishlist.user)
  @JoinColumn()
  wishlist: WishlistEntity;
}

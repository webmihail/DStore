import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { ProductEntity } from 'src/products/entity/product.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'comments' })
@Unique(['id'])
export class CommentEntity extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Mihail',
    description: 'Comment name',
  })
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({
    example: 'Товар супер! ОБЯЗАТЕЛЬНО ЗАКАЖУ ЕЩЕ',
    description: 'Comment description',
  })
  @Column({ name: 'description', type: 'varchar', length: 255 })
  description: string;

  @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.comments)
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.comments)
  user: UserEntity;
}

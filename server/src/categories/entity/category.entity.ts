import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { ProductEntity } from 'src/products/entity/product.entity';
import { ProductTypeEntity } from 'src/productTypes/entity/productType.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  Unique,
} from 'typeorm';

@Entity('categories')
@Unique(['id'])
@Tree('materialized-path')
export class CategoryEntity extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Man clothes',
    description: 'category name',
  })
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  name: string;

  @ApiProperty({
    example: 'https://www.fsdfdsf.fdfs',
    description: 'category icon url',
  })
  @Column({
    name: 'iconUrl',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  iconUrl?: string;

  @TreeChildren({ cascade: ['soft-remove', 'remove', 'recover'] })
  children: CategoryEntity[];

  @TreeParent({ onDelete: 'CASCADE' })
  parent: CategoryEntity;

  @OneToMany(
    () => ProductEntity,
    (product: ProductEntity) => product.category,
    {
      cascade: true,
    },
  )
  products: ProductEntity[];

  @OneToMany(
    () => ProductTypeEntity,
    (productType: ProductTypeEntity) => productType.category,
    {
      cascade: true,
    },
  )
  productTypes: ProductTypeEntity[];
}

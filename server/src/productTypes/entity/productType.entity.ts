import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from 'src/categories/entity/category.entity';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { ProductEntity } from 'src/products/entity/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'product_types' })
@Unique(['id', 'name'])
export class ProductTypeEntity extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Класссические джинсы',
    description: 'Product type name',
  })
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @OneToMany(
    () => ProductEntity,
    (product: ProductEntity) => product.productType,
    {
      cascade: true,
    },
  )
  products: ProductEntity[];

  @ManyToOne(
    () => CategoryEntity,
    (category: CategoryEntity) => category.productTypes,
    {
      onDelete: 'CASCADE',
    },
  )
  category: CategoryEntity;
}

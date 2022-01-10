import { ApiProperty } from '@nestjs/swagger';
import { BrandEntity } from 'src/brands/entity/brand.entity';
import { CategoryEntity } from 'src/categories/entity/category.entity';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { ProductTypeEntity } from 'src/productTypes/entity/productType.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'products' })
@Unique(['id'])
export class ProductEntity extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Футболка Uniq', description: 'Product name' })
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ example: 199, description: 'Product price' })
  @Column({ name: 'price', type: 'numeric', nullable: true })
  price: number;

  @ManyToOne(
    () => CategoryEntity,
    (category: CategoryEntity) => category.products,
    {
      onDelete: 'CASCADE',
    },
  )
  category: CategoryEntity;

  @ManyToOne(
    () => ProductTypeEntity,
    (productType: ProductTypeEntity) => productType.products,
    {
      onDelete: 'CASCADE',
    },
  )
  productType: ProductTypeEntity;

  @ManyToOne(() => BrandEntity, (brand: BrandEntity) => brand.products, {
    onDelete: 'CASCADE',
  })
  brand: BrandEntity;
}

import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { ProductEntity } from 'src/products/entity/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'products_info' })
@Unique(['id'])
export class ProductInfoEntity extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Классические плотные и элегантные джинсы',
    description: 'Product info title',
  })
  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({
    example: 'Тип ткани: коттон, размер: L',
    description: 'Product info description',
  })
  @Column({ name: 'country', type: 'varchar', length: 255 })
  description: string;

  @ApiProperty({
    example: true,
    description: 'Is product exist in stock',
  })
  @Column({ name: 'inStock', type: 'boolean', default: false })
  inStock: boolean;

  @ApiProperty({
    example: ['http://fjsdjflsdf.com/image', 'http://dwewrwer.com/image'],
    description: 'Array of images url',
  })
  @Column({ name: 'images', type: 'array' })
  images: string[];

  @ApiProperty({
    example: 10,
    description: 'Count of product in stock',
  })
  @Column({ name: 'count', type: 'numeric' })
  count: number;

  @ManyToOne(
    () => ProductEntity,
    (product: ProductEntity) => product.productsInfo,
    {
      cascade: true,
    },
  )
  product: ProductEntity;
}

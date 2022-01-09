import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/entity/category.entity';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { ProductDTO } from 'src/products/dtos/product.dto';
import { Product } from 'src/products/entity/product.entity';
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
export class ProductType extends GenericEntity {
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

  @OneToMany(() => Product, (product: Product) => product.productType, {
    cascade: true,
  })
  products: ProductDTO[];

  @ManyToOne(() => Category, (category: Category) => category.productTypes, {
    onDelete: 'CASCADE',
  })
  category: Category;
}

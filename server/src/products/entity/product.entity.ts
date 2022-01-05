import { ApiProperty } from '@nestjs/swagger';
import { CategoryDTO } from 'src/categories/dtos/category.dto';
import { Category } from 'src/categories/entity/category.entity';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { ProductType } from 'src/productTypes/entity/productType.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'products' })
@Unique(['id'])
export class Product extends GenericEntity {
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

  @ManyToOne(() => Category, (category: Category) => category.products, {
    onDelete: 'CASCADE',
  })
  category: CategoryDTO;

  @ManyToOne(
    () => ProductType,
    (productType: ProductType) => productType.products,
    {
      onDelete: 'CASCADE',
    },
  )
  productType: ProductType;
}

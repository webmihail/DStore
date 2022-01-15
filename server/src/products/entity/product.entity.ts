import { ApiProperty } from '@nestjs/swagger';
import { BrandEntity } from 'src/brands/entity/brand.entity';
import { CategoryEntity } from 'src/categories/entity/category.entity';
import { CommentEntity } from 'src/comments/entity/comment.entity';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { ColumnNumericTransformer } from 'src/common/transformers/ColumnNumericTransformer';
import { PieceEntity } from 'src/pieces/entity/piece.entity';
import { ProductInfoEntity } from 'src/productsInfo/entity/productInfo.entity';
import { ProductTypeEntity } from 'src/productTypes/entity/productType.entity';
import { RatingEntity } from 'src/ratings/entity/rating.entity';
import { SaleEntity } from 'src/sales/entity/sale.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
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
  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
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

  @ManyToOne(() => SaleEntity, (sale: SaleEntity) => sale.products, {
    onDelete: 'CASCADE',
  })
  sale: SaleEntity;

  @OneToMany(
    () => ProductInfoEntity,
    (productInfo: ProductInfoEntity) => productInfo.product,
    {
      cascade: true,
    },
  )
  productsInfo: ProductInfoEntity[];

  @OneToMany(() => PieceEntity, (piece: PieceEntity) => piece.product, {
    cascade: true,
  })
  pieces: PieceEntity[];

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.product, {
    cascade: true,
  })
  comments: CommentEntity[];

  @OneToMany(() => RatingEntity, (rating: RatingEntity) => rating.product, {
    cascade: true,
  })
  ratings: RatingEntity[];
}

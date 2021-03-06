import { ApiProperty } from '@nestjs/swagger';
import { ColorEntity } from 'src/colors/entity/color.entity';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { ColumnNumericTransformer } from 'src/common/transformers/ColumnNumericTransformer';
import PublicFileEntity from 'src/fileManager/entity/publicFile.entity';
import { PieceEntity } from 'src/pieces/entity/piece.entity';
import { ProductEntity } from 'src/products/entity/product.entity';
import { SizeEntity } from 'src/sizes/entity/size.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
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
    example: 'Тип ткани: коттон, очень легко носится, хорошо прилегает к телу',
    description: 'Product info description',
  })
  @Column({ name: 'description', type: 'varchar', length: 255 })
  description: string;

  @ApiProperty({
    example: 'AE-34534',
    description: 'Product info code',
  })
  @Column({ name: 'code', type: 'varchar', length: 255 })
  code: string;

  @ApiProperty({
    example: true,
    description: 'Is product exist in stock',
  })
  @Column({ name: 'inStock', type: 'boolean', default: false })
  inStock: boolean;

  @ApiProperty({
    example: 10,
    description: 'Count of product in stock',
  })
  @Column('numeric', {
    transformer: new ColumnNumericTransformer(),
    nullable: true,
  })
  count: number;

  @OneToMany(
    () => PublicFileEntity,
    (image: PublicFileEntity) => image.productInfo,
    {
      cascade: true,
    },
  )
  images: PublicFileEntity[];

  @ManyToOne(
    () => ProductEntity,
    (product: ProductEntity) => product.productsInfo,
    {
      onDelete: 'CASCADE',
    },
  )
  product: ProductEntity;

  @OneToMany(() => PieceEntity, (piece: PieceEntity) => piece.productInfo, {
    cascade: true,
  })
  pieces: PieceEntity[];

  @ManyToOne(() => SizeEntity, (size: SizeEntity) => size.productsInfo, {
    onDelete: 'CASCADE',
  })
  size: SizeEntity;

  @ManyToOne(() => ColorEntity, (color: ColorEntity) => color.productsInfo, {
    onDelete: 'CASCADE',
  })
  color: ColorEntity;
}

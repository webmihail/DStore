import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from 'src/categories/entity/category.entity';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { ProductInfoEntity } from 'src/productsInfo/entity/productInfo.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'public_file' })
@Unique(['id'])
class PublicFileEntity extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'https://blaaaaa.com/img/',
    description: 'image url',
  })
  @Column()
  url: string;

  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba-image.jpg',
    description: 'image key',
  })
  @Column()
  key: string;

  @ManyToOne(
    () => ProductInfoEntity,
    (productInfo: ProductInfoEntity) => productInfo.images,
    {
      onDelete: 'CASCADE',
    },
  )
  productInfo: ProductInfoEntity;

  @OneToOne(
    () => CategoryEntity,
    (category: CategoryEntity) => category.image,
    {
      onDelete: 'CASCADE',
    },
  )
  category: CategoryEntity;
}

export default PublicFileEntity;

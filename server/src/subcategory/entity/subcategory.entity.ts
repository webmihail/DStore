import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/entity/category.entity';
import { GenericEntity } from 'src/common/generic/generic.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('subcategory')
@Unique(['id'])
export class Subcategory extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'T-shirt',
    description: 'subcategory name',
  })
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  name: string;

  @ApiProperty({
    example: 'https://www.fsdfdsf.fdfs',
    description: 'subcategory icon url',
  })
  @Column({
    name: 'iconUrl',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  iconUrl?: string;

  @ManyToOne(() => Category, (category: Category) => category.subcategories)
  category: Category;
}

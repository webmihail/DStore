import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  Unique,
} from 'typeorm';

@Entity('category')
@Unique(['id'])
@Tree('materialized-path')
export class Category extends GenericEntity {
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
  children: Category[];

  @TreeParent({ onDelete: 'CASCADE' })
  parent: Category;
}

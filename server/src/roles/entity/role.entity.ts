import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { Permission } from 'src/permissions/entity/permission.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'roles' })
@Unique(['id', 'name'])
export class Role extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Administrator', description: 'Role name' })
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  @Column({ name: 'description', type: 'varchar', length: 255 })
  description: string;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];
}

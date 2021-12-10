import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { RolesTypes } from '../constants';

@Entity({ name: 'roles' })
@Unique(['id', 'type'])
export class Role extends GenericEntity {
  @ApiProperty({ example: '1', description: 'unique idetificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ enum: RolesTypes })
  @Column({ name: 'type', type: 'enum', enum: RolesTypes })
  type: RolesTypes;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  @Column({ name: 'description', type: 'varchar', length: 255 })
  description: string;
}

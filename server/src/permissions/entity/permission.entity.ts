import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { PermissionTypes } from '../constants';

@Entity({ name: 'permissions' })
@Unique(['id', 'name'])
export class PermissionEntity extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ enum: PermissionTypes })
  @Column({ name: 'name', type: 'enum', enum: PermissionTypes })
  name: PermissionTypes;

  @ApiProperty({
    example: 'Administrator',
    description: 'Permission description',
  })
  @Column({ name: 'description', type: 'varchar', length: 255 })
  description: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'bans' })
@Unique(['id'])
export class BanEntity extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'isBanned', type: 'boolean', default: true })
  isBanned: boolean;

  @ApiProperty({ example: 'Indecent behavior', description: 'User ban reason' })
  @Column({ name: 'banReason', type: 'varchar', length: 255 })
  banReason: string;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.ban)
  users: UserEntity[];
}

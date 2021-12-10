import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { Role } from 'src/roles/entity/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'users' })
@Unique(['id', 'email'])
export class User extends GenericEntity {
  @ApiProperty({ example: '1', description: 'unique idetificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Mihail', description: 'User first name' })
  @Column({ name: 'first_name', type: 'varchar', length: 255 })
  firstName: string;

  @ApiProperty({ example: 'Ivanov', description: 'User last name' })
  @Column({ name: 'last_name', type: 'varchar', length: 255 })
  lastName: string;

  @ApiProperty({ example: 'ivanov@gmail.com', description: 'user email' })
  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })
  email: string;

  @ApiProperty({ example: 'S1234ghgh', description: 'User password' })
  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
    nullable: false,
    select: false,
  })
  password: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}

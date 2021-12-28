import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { Role } from 'src/roles/entity/role.entity';
import { hash } from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Ban } from 'src/bans/entity/ban.entity';

@Entity({ name: 'users' })
@Unique(['id', 'email'])
export class User extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({
    name: 'currentHashedRefreshToken',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public currentHashedRefreshToken?: string;

  @Column({ name: 'isEmailConfirmed', type: 'boolean', default: false })
  public isEmailConfirmed?: boolean;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @ManyToOne(() => Ban, (ban: Ban) => ban.users)
  ban: Ban;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<null> {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }
}

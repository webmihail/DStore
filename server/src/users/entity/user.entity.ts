import { ApiProperty } from '@nestjs/swagger';
import { GenericEntity } from 'src/common/generic/generic.entity';
import { RoleEntity } from 'src/roles/entity/role.entity';
import { hash } from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BanEntity } from 'src/bans/entity/ban.entity';
import { BasketEntity } from 'src/baskets/entity/basket.entity';

@Entity({ name: 'users' })
@Unique(['id', 'email'])
export class UserEntity extends GenericEntity {
  @ApiProperty({
    example: '29be0ee3-fe77-331e-a1bf-9494ec18c0ba',
    description: 'uuid idetificator',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Mihail', description: 'User first name' })
  @Column({ name: 'firstName', type: 'varchar', length: 255 })
  firstName: string;

  @ApiProperty({ example: 'Ivanov', description: 'User last name' })
  @Column({ name: 'lastName', type: 'varchar', length: 255 })
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

  @OneToOne(() => BasketEntity, (basket: BasketEntity) => basket.user)
  @JoinColumn()
  basket: BasketEntity;

  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles: RoleEntity[];

  @ManyToOne(() => BanEntity, (ban: BanEntity) => ban.users)
  ban: BanEntity;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<null> {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }
}

import { GenericEntity } from 'src/common/generic/generic.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 255 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255 })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
    nullable: false,
    select: false,
  })
  password: string;
}

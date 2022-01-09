import { UpdateDateColumn, CreateDateColumn } from 'typeorm';

export class GenericEntity {
  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  updateAt: Date;
}

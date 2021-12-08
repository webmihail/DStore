import { UpdateDateColumn, CreateDateColumn } from 'typeorm';

export class GenericEntity {
  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  update_at: Date;
}

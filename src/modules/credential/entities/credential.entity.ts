import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('credential')
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 254,
    nullable: false,
    comment: 'Usuário utilizado para login',
  })
  user: string;

  @Column({ length: 254 })
  password: string;

  @Column({ length: 254 })
  salt: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => null,
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}

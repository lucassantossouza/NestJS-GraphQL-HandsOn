import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/**
 * @description
 * Entidade para armazenar informações de segurança do usuário, tais como bloqueio de conta, histórico de bloqueio, etc.
 */
@Entity({
  name: 'userLoginSecurity',
})
export class userLoginSecurity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  credentialId: number;

  @Column({ type: 'boolean', nullable: true, default: false })
  locked: boolean;

  @Column({ type: 'bigint', nullable: true })
  lockedHistoryId: number;

  @Column({ type: 'boolean', nullable: true, default: false })
  passwordResetRequired: boolean;

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

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * @description
 * Entidade com fins de armazenar e rastrear o histórico de bloqueio de contas de usuário.
 */

@Entity({
  name: 'accountLockHistory',
})
export class AccountLockHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint', nullable: false })
  credentialId: number;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Data e hora em que a conta foi bloqueada',
  })
  lockedAt: Date;

  @Column({
    type: 'varchar',
    length: 254,
    nullable: false,
    comment: 'Motivo do bloqueio da conta',
  })
  reason: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    comment: 'Data e hora em que a conta foi desbloqueada',
  })
  unlockedAt: Date;

  @Column({
    type: 'varchar',
    length: 254,
    nullable: true,
    comment: 'Motivo do desbloqueio da conta',
  })
  unlockReason: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}

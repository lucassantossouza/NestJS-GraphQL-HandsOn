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
 * Entidade com fins de armazenar e rastrear o histórico de senhas de usuário.
 */

@Entity({ name: 'passwordHistory' })
export class PasswordHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint', nullable: false, comment: 'Id da credencial' })
  credentialId: number;

  @Column({
    type: 'varchar',
    length: 254,
    nullable: false,
    comment: 'Senha utilizada pelo usuário',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 254,
    nullable: false,
    comment: 'Salt do hash da senha',
  })
  salt: string;

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

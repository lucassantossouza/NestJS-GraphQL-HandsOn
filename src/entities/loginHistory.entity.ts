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
 * Entidade com fins de armazenar e rastrear o histórico de tentativas de login de usuários.
 */

@Entity({ name: 'loginHistory' })
export class LoginHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'bigint',
    nullable: true,
    comment:
      'Id da credencial (Em casos de falha de login, o id da credencial pode não ser encontrado)',
  })
  credentialId: number | null;

  @Column({
    type: 'varchar',
    length: 254,
    nullable: false,
    comment: 'Nome de usuário utilizado na tentativa de login',
  })
  username: string;

  @Column({
    type: 'boolean',
    nullable: false,
    comment: 'Indica se a tentativa de login foi bem sucedida',
  })
  success: boolean;

  @Column({
    type: 'varchar',
    length: 254,
    nullable: true,
    comment: 'IP de origem da tentativa de login',
  })
  ip: string | null;

  @Column({
    type: 'varchar',
    length: 254,
    nullable: true,
    comment:
      'Motivo da falha da tentativa de login (Em caso de falha de login)',
  })
  failReason: string;

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

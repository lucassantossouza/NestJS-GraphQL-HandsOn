import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 254, comment: 'Nome do usuário' })
  name: string;

  @Column({ length: 254, comment: 'Apelido ou nome de exibição do usuário' })
  nickname: string;

  @Column({ length: 254, comment: 'Email do usuário' })
  email: string;

  @Column({ length: 11, comment: 'Telefone do usuário' })
  phone: string;

  @Column({ type: 'bigint', nullable: true, comment: 'Id da credencial' })
  credentialId: number;

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

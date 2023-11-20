import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'bigint', nullable: false })
  credentialId: number;

  @Column({ type: 'varchar', nullable: false, comment: 'Hash do token' })
  token: string;

  @Column({ type: 'varchar', nullable: false, comment: 'Salt do token' })
  salt: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    comment: 'Data de expiração',
    // sum current date with env variable parseInt(process.env.TOKEN_EXPIRES_IN || '60', 10)
    default: () => 'CURRENT_TIMESTAMP',
  })
  expiresIn: Date;

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

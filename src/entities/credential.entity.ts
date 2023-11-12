import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 254 })
  identifier: string;

  @Column({ length: 254 })
  password: string;

  @Column({ nullable: true })
  deletedAt: Date;
}

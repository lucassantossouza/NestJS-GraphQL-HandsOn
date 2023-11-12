import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 254 })
  name: string;

  @Column({ length: 254 })
  nickname: string;

  @Column({ length: 254 })
  email: string;

  @Column({ length: 11 })
  phone: string;

  @Column({ nullable: true })
  credentialId: number;

  @Column({ nullable: true })
  deletedAt: Date;
}

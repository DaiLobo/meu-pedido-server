import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", nullable: false })
  name: string;

  @Column({ name: "email", nullable: false, unique: true })
  email: string;

  @Column({ name: "password", nullable: false })
  password: string;

  @Column({ name: "address", nullable: true })
  address: string;

  @Column({ name: "cep", nullable: true })
  cep: string;

  @Column({ name: "uf", nullable: true })
  uf: string;

  @Column({ name: "phone", nullable: true })
  phone: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: string;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: string;
}

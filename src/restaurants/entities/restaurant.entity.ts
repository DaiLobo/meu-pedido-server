import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Category } from "../category.enum";

@Entity({ name: "restaurants" })
export class Restaurant {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", unique: true })
  name: string;

  @Column({ name: "description", nullable: true })
  description: string;

  @Column({ name: "opening_hours" })
  opening_hours: string; // Horários no formato "08:00-18:00"

  @Column({ name: "address" })
  address: string;

  @Column({ name: "cep", nullable: true })
  cep: string;

  @Column({ name: "uf", nullable: true })
  uf: string;

  @Column({ name: "logo_url" })
  logo_url: string;

  @Column({ name: "phone", nullable: true })
  phone: string;

  @Column({ name: "category", type: "enum", enum: Category, nullable: true })
  category: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: string;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: string;
}

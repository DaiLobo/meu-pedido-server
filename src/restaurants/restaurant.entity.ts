import { MenuItem } from "src/menu-items/menu-item.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Category } from "./category.enum";
import { User } from "src/users/user.entity";

@Entity({ name: "restaurants" })
export class Restaurant {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => MenuItem, (menuItem) => menuItem.restaurantId)
  menuItems: MenuItem[];

  @Column({ name: "name", unique: true })
  name: string;

  @Column({ name: "cnpj", unique: true })
  cnpj: string;

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
  category: Category;

  @ManyToOne(() => User, (user) => user.restaurants, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "user_id", nullable: true })
  userId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: string;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: string;
}

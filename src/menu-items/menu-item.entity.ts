import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity({ name: "menu_items" })
export class MenuItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", unique: true })
  name: string;

  @Column({ name: "description", nullable: true })
  description: string;

  @Column({ name: "price", type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ name: "img_url", nullable: true })
  imgUrl: string;

  @Column({ name: "restaurant_id" })
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menuItems, {
    onDelete: "CASCADE"
  })
  restaurantId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: string;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: string;
}

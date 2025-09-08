import { OrderItem } from "src/order_items/order_item.entity";
import { User } from "src/users/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { Status } from "./status.enum";

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id" })
  userId: string;

  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "restaurant_id" })
  restaurantId: string;

  @Column({ name: "total_price", type: "decimal" })
  totalPrice: number;

  @Column({
    name: "status",
    type: "enum",
    enum: Status,
    nullable: true,
    default: "PENDING"
  })
  status: Status;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: string;

  @CreateDateColumn({ name: "updated_at" })
  updatedAt: string;
}

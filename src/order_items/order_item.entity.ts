import { MenuItem } from "src/menu-items/menu-item.entity";
import { Order } from "src/orders/orders.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity({ name: "order_items" })
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Column({ name: "order_id" })
  orderId: string;

  @Column({ name: "menu_item_id" })
  menuItemId: string;

  @OneToOne(() => MenuItem)
  @JoinColumn({ name: "menu_item_id" })
  menuItem: MenuItem;

  @Column({ name: "quantity", type: "int" })
  quantity: number;

  @Column({ name: "price", type: "decimal" })
  price: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: string;

  @CreateDateColumn({ name: "updated_at" })
  updatedAt: string;
}

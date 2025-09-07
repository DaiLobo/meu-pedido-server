import { MenuItem } from "src/menu-items/menu-item.entity";
import { OrderItem } from "src/order_items/order_item.entity";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { OrderController } from "./orders.controller";
import { Order } from "./orders.entity";
import { OrderService } from "./orders.service";

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, MenuItem])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}

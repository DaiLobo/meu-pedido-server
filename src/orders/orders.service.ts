import { MenuItem } from "src/menu-items/menu-item.entity";
import { OrderItem } from "src/order_items/order_item.entity";
import { Repository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateOrderDto } from "./dto/create-orders.dto";
import { UpdateOrderDto } from "./dto/update-orders.dto";
import { Order } from "./orders.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>
  ) {}

  /* TODO: Validar se itens pertecem ao restaurante */
  async create(createOrderDto: CreateOrderDto) {
    try {
      /* Cria o pedido sem o total por enquanto */
      const order = this.orderRepository.create({
        userId: createOrderDto.userId,
        restaurantId: createOrderDto.restaurantId,
        totalPrice: 0, // Será atualizado depois
        status: "pending"
      });

      await this.orderRepository.save(order);

      /* Cria os items do pedido */
      let total = 0;
      for (const item of createOrderDto.items) {
        const menuItem = await this.menuItemRepository.findOneBy({
          id: item.menuItemId
        });
        const price = Number(menuItem.price) * item.quantity;
        total += price;

        const orderItem = this.orderItemRepository.create({
          orderId: order.id,
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          price: price
        });

        await this.orderItemRepository.save(orderItem);
      }

      /* Volta para pedido para que atualize o preço total */
      order.totalPrice = total;

      await this.orderRepository.update(order.id, { totalPrice: total });

      return order;
    } catch (error) {
      throw { error, message: "Houve um erro ao realizar seu pedido." };
    }
  }

  async findAll(userId: string) {
    return await this.orderRepository.find({
      where: { userId },
      relations: ["orderItems"]
    });
  }

  async findOne(id: string) {
    return await this.orderRepository.findOne({
      where: { id },
      relations: ["orderItems"]
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: string) {
    return `This action removes a #${id} order`;
  }
}

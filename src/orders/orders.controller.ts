import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { User } from "src/users/user.entity";

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from "@nestjs/common";

import { CreateOrderDto } from "./dto/create-orders.dto";
import { UpdateOrderDto } from "./dto/update-orders.dto";
import { OrderService } from "./orders.service";
import { Status } from "./status.enum";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createOrderDto: CreateOrderDto
  ) {
    const data = {
      userId: user.id,
      ...createOrderDto
    };

    const order = await this.orderService.create(data);

    return {
      message: "Pedido criado com sucesso.",
      data: order
    };
  }

  /* TODO: Testar mandando o id do usuário */
  @Get()
  async findAll(@CurrentUser() user: User) {
    return await this.orderService.findAll(user.id);
  }

  /* TODO: Adicionar id do restaurante */
  @Get("/restaurant/:id")
  async findAllOrderByRestaurant(@CurrentUser() user: User) {
    return await this.orderService.findAll(user.id);
  }

  //Pegar STATUS do pedido
  @Get(":id/status")
  async findOrderStatus(@Param("id") id: string) {
    const status = await this.orderService.findOrderStatus(id);

    return {
      status
    };
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.orderService.findOne(id);
  }

  @Patch(":id/status")
  async updateStatus(
    @Param("id") id: string,
    @CurrentUser() user: User,
    @Body() data: { status: Status }
  ) {
    try {
      const restaurantsId = user.restaurants.map((restaurant) => restaurant.id);
      if (!restaurantsId || restaurantsId.length === 0) {
        throw new Error("Usuário não está associado a nenhum restaurante.");
      }

      await this.orderService.updateOrderStatus(id, data.status, restaurantsId);
      return {
        message: "Status do pedido atualizado com sucesso."
      };
    } catch (error) {
      return {
        error: error.message
      };
    }
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.orderService.remove(id);
  }
}

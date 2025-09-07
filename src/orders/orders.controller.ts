import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from "@nestjs/common";
import { OrderService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-orders.dto";
import { UpdateOrderDto } from "./dto/update-orders.dto";
import { User } from "src/users/user.entity";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";

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

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.orderService.findOne(id);
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

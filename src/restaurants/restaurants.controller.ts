import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from "@nestjs/common";

import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { RestaurantsService } from "./restaurants.service";

@Controller("restaurants")
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return await this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  async findAll() {
    return await this.restaurantsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.restaurantsService.findOne(id); // +id - converte id para número
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto
  ) {
    return await this.restaurantsService.update(id, updateRestaurantDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.restaurantsService.remove(id);
  }
}

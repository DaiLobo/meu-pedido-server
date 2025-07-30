import { Response } from "express";
import { IsPublic } from "src/auth/decorators/is-public.decorator";

import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res
} from "@nestjs/common";

import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { RestaurantsService } from "./restaurants.service";

@Controller("restaurants")
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  async create(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @Res() res: Response
  ) {
    try {
      const restaurant =
        await this.restaurantsService.create(createRestaurantDto);

      return res.status(HttpStatus.CREATED).json({
        message: "Restaurante criado com sucesso.",
        data: restaurant
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        return res.status(HttpStatus.CONFLICT).json({
          message: error.message
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Erro ao criar restaurante."
      });
    }
  }

  @Get()
  @IsPublic()
  async findAll(@Res() res: Response) {
    try {
      const restaurants = await this.restaurantsService.findAll();

      return res.status(HttpStatus.OK).json({
        message: "Lista de restaurantes",
        data: restaurants
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Erro ao recuperar restaurantes",
        error: error.message
      });
    }
  }

  @Get(":id")
  @IsPublic()
  async findOne(@Param("id") id: string, @Res() res: Response) {
    try {
      const restaurant = await this.restaurantsService.findOne(id); // +id - converte id para número

      return res.status(HttpStatus.OK).json({ data: restaurant });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Erro ao buscar restaurante."
      });
    }
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
    @Res() res: Response
  ) {
    //TODO: Conferir se é o dono do restaurante querendo atualizar
    try {
      const updated = await this.restaurantsService.update(
        id,
        updateRestaurantDto
      );

      return res.status(HttpStatus.OK).json({
        message: "Restaurante atualizado com sucesso",
        data: updated
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Erro ao atualizar restaurante."
      });
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Res() res: Response) {
    //TODO: Conferir se é o dono do restaurante querendo atualizar
    try {
      await this.restaurantsService.remove(id);

      return res.status(HttpStatus.NO_CONTENT).json({
        message: "Restaurante removido com sucesso"
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Erro ao remover restaurante."
      });
    }
  }
}

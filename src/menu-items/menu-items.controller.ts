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
  Query,
  Res
} from "@nestjs/common";

import { CreateMenuItemDto } from "./dto/create-menu-item.dto";
import { UpdateMenuItemDto } from "./dto/update-menu-item.dto";
import { MenuItemsService } from "./menu-items.service";

@Controller("menu-items")
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Post()
  async create(
    @Body() createMenuItemDto: CreateMenuItemDto,
    @Res() res: Response
  ) {
    try {
      const menuItem = await this.menuItemsService.create(createMenuItemDto);

      return res.status(HttpStatus.CREATED).json({
        message: "Item do cardápio criado com sucesso.",
        data: menuItem
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        return res.status(HttpStatus.CONFLICT).json({
          message: error.message
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Erro ao criar item do cardápio."
      });
    }
  }

  @Get()
  @IsPublic()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Res() res: Response
  ) {
    try {
      const menuItems = await this.menuItemsService.findAll(
        Number(page),
        Number(limit)
      );

      return res.status(HttpStatus.OK).json({
        message: "Itens do cardápio encontrados com sucesso.",
        menuItems
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Erro ao buscar itens do cardápio.",
        error: error.message
      });
    }
  }

  @Get(":id")
  @IsPublic()
  async findOne(@Param("id") id: string, @Res() res: Response) {
    try {
      const item = this.menuItemsService.findOne(id);

      return res.status(HttpStatus.OK).json({
        message: "Item do cardápio encontrado com sucesso.",
        data: item
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Erro ao buscar item do cardápio.",
        error: error.message
      });
    }
  }

  //TODO: Adicionar validação se é o usuário dono do restaurante editando
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
    @Res() res: Response
  ) {
    try {
      const updated = await this.menuItemsService.update(id, updateMenuItemDto);

      return res.status(HttpStatus.OK).json({
        message: "Item do cardápio atualizado com sucesso.",
        data: updated
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Erro ao atualizar item do cardápio."
      });
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Res() res: Response) {
    try {
      await this.menuItemsService.remove(id);

      return res.status(HttpStatus.NO_CONTENT).json({
        message: "Item do cardápio removido com sucesso."
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Erro ao remover item do cardápio.",
        error: error.message
      });
    }
  }
}

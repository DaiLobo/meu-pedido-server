import { Response } from "express";

import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Res
} from "@nestjs/common";

import { UpdateUserDto } from "./dto/update-users.dto.js";
import { UserDomain } from "./user.domain.js";
import { UserService } from "./users.service";
import { User } from "./user.entity.js";

@Controller("users") // Gerencia as rotas HTTP e manipula solicitações e respostas
export class UsersController {
  constructor(private readonly userService: UserService) {} // Injeta o serviço

  @Get()
  async findAllUsers(@Res() response: Response) {
    try {
      const users = await this.userService.findAll();
      return response.status(200).json(users);
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Erro ao recuperar usuários",
        error: error.message
      });
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Res() response: Response) {
    try {
      const user = await this.userService.findById(id);

      if (!user) {
        throw new NotFoundException("Usuário não encotrado");
      }

      return response.status(HttpStatus.OK).json({
        message: "Usuário encontrado com sucesso",
        data: user
      });
    } catch (error) {
      const status =
        error instanceof NotFoundException
          ? HttpStatus.NOT_FOUND
          : HttpStatus.INTERNAL_SERVER_ERROR;

      return response.status(status).json({
        message: error.message || "Erro ao buscar o usuário",
        error: error.message
      });
    }
  }

  @Get("by-email")
  async getUserByEmail(@Query("email") email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @Post()
  async createUser(@Res() response: Response, @Body() user: UserDomain) {
    try {
      const userCreated = await this.userService.createUser(user);
      return response
        .status(201)
        .json({ message: "Usuário criado com sucesso", data: userCreated });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(
          { message: error.message },
          HttpStatus.CONFLICT
        );
      }

      throw new HttpException(
        {
          message: "Erro ao criar o usuário",
          error: error.message
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response
  ) {
    try {
      const updateUser = await this.userService.update(id, updateUserDto);

      if (!updateUser) {
        throw new NotFoundException("Usuário não encontrado para atualização");
      }

      return response.status(HttpStatus.OK).json({
        message: "Usuário atualizado com sucesso",
        data: updateUser
      });
    } catch (error) {
      const status =
        error instanceof NotFoundException
          ? HttpStatus.NOT_FOUND
          : HttpStatus.INTERNAL_SERVER_ERROR;

      return response.status(status).json({
        message: error.message || "Erro ao atualizar o usuário",
        error: error.message
      });
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Res() response: Response) {
    try {
      const result = await this.userService.remove(id);

      if (!result) {
        throw new NotFoundException("Usuário não encontrado para remoção");
      }

      return response.status(HttpStatus.OK).json({
        message: "Usuário removido com sucesso"
      });
    } catch (error) {
      const status =
        error instanceof NotFoundException
          ? HttpStatus.NOT_FOUND
          : HttpStatus.INTERNAL_SERVER_ERROR;

      return response.status(status).json({
        message: error.message || "Erro ao remover o usuário",
        error: error.message
      });
    }
  }
}

import { Response } from "express";

import { Body, Controller, Get, Post, Res } from "@nestjs/common";

import { UserDomain } from "./user.domain.js";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAllUsers(@Res() response: Response) {
    const users = await this.userService.findAllUsers();
    return response.status(200).json(users);
  }

  @Post()
  async createUser(@Res() response: Response, @Body() user: UserDomain) {
    const userCreated = await this.userService.createUser(user);

    return response.status(201).json(userCreated);
  }
}

import { Repository } from "typeorm";

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserDomain } from "./user.domain.js";
import { Users } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) {}

  async findAllUsers(): Promise<Users[]> {
    const users = await this.usersRepository.find();

    if (users.length === 0)
      throw new HttpException("Users not found", HttpStatus.NOT_FOUND);

    return users;
  }

  async createUser(user: UserDomain): Promise<UserDomain> {
    const createdUser = await this.usersRepository.save(user);
    return createdUser;
  }
}

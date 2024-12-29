import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";

import {
  ConflictException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UpdateUserDto } from "./dto/update-users.dto.js";
import { UserDomain } from "./user.domain.js";
import { User } from "./user.entity";

@Injectable() // Provedor de dependências. Permite que seja injetada em outras partes do sistema como controladores.
export class UserService {
  // Lógica de negócio da aplicação. Chamado pelos controladores. Integra com bd atraves do repositório.
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User> // Injeta o repositório
  ) {}

  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async createUser(userDto: UserDomain): Promise<UserDomain> {
    const existingUser = await this.userRepository.findOne({
      where: { email: userDto.email }
    });

    if (existingUser) {
      throw new ConflictException("E-mail já cadastrado");
    }

    const hashedPassword = await this.hashPassword(userDto.password);

    const createdUser = this.userRepository.create({
      ...userDto,
      password: hashedPassword
    });

    await this.userRepository.save(createdUser);

    return {
      ...createdUser,
      password: null
    };
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, updateUserDto);
    //Verificar email
    //validação das informações que vem. colocar midleware de validação de entrada para verificar as info e sanitização

    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<{ message: string }> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }
    await this.userRepository.remove(user);

    return {
      message: "Usuário removido com sucesso"
    };
  }
}

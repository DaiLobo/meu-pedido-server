import * as bcrypt from "bcrypt";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";

import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(email: string, plainPassword: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const passwordMatches = await bcrypt.compare(plainPassword, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    return user;
  }
}

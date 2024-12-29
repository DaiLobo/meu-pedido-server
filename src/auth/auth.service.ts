import { User } from "src/users/user.entity";
import { UserService } from "src/users/users.service";

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserPayload } from "./models/UserPayload";
import { UserToken } from "./models/UserToken";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {} // sempre que precisar de serviço, abre no construtor e pede via injeção de dependencia do nestjs.

  login(user: User): UserToken {
    // transformar o user em JWT
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await this.userService.comparePasswords(
        password,
        user.password
      );

      if (isPasswordValid) {
        return {
          ...user,
          password: null
        };
      }
    }

    throw new Error("E-mail ou senha fornecidos estão incorretos");
  }
}

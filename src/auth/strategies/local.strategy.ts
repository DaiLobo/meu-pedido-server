import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local"; // estratégia de autenticação com usuário e senha
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // Conecta com a estratégia do passport
  constructor(private authService: AuthService) {
    super({ usernameField: "email" });
  }

  validate(email: string, password: string) {
    return this.authService.validateUser(email, password);
  }
}

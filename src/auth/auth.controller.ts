import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { IsPublic } from "./decorators/is-public.decorator";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthRequest } from "./models/AuthRequest";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard) // login depende desse guardião para funcionar
  @IsPublic()
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}

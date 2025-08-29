import {
  Controller,
  Get,
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
import { CurrentUser } from "./decorators/current-user.decorator";
import { User } from "src/users/user.entity";

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

  @Get("profile")
  getProfile(@CurrentUser() user: User) {
    return user;
  }
}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "./user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Registra a entidade "User"
  controllers: [UsersController], // Declara o controlador
  providers: [UsersService] // Declara o serviço
})
export class UsersModule {}

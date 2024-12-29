import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { UserModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      // conexão com banco de dados usando TypeORM
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true, // carrega automaticamente todas as entidades registradas no projeto
      synchronize: true, // sincroniza as entedidades com bd. usar apenas em ambiente de desenvolvimento
      logging: true, // habilita os logs SQL
      entities: [__dirname + "/**/*.entity{.js,.ts}"]
    }),
    UserModule,
    RestaurantsModule,
    AuthModule
  ],
  controllers: [], // são responsáveis por gerenciar as rotas HTTP
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {} // primeira classe carregada ao iniciar a aplicação

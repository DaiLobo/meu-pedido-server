import { Restaurant } from "src/restaurants/restaurant.entity";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MenuItem } from "./menu-item.entity";
import { MenuItemsCacheService } from "./menu-items-cache.service";
import { MenuItemsController } from "./menu-items.controller";
import { MenuItemsService } from "./menu-items.service";

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem, Restaurant])],
  controllers: [MenuItemsController],
  providers: [MenuItemsService, MenuItemsCacheService]
})
export class MenuItemsModule {}

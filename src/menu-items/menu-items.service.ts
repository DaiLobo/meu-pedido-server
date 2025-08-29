import { Restaurant } from "src/restaurants/restaurant.entity";
import { User } from "src/users/user.entity";
import { Repository } from "typeorm";

import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateMenuItemDto } from "./dto/create-menu-item.dto";
import { UpdateMenuItemDto } from "./dto/update-menu-item.dto";
import { MenuItem } from "./menu-item.entity";
import { MenuItemsCacheService } from "src/menu-items/menu-items-cache.service";

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @Inject(MenuItemsCacheService)
    private menuItemsCacheService: MenuItemsCacheService
  ) {}

  async create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    const existingItem = await this.menuItemRepository.findOneBy({
      name: createMenuItemDto.name
    });

    if (existingItem) {
      throw new ConflictException("Item de cardápio já existe");
    }

    const menuItem = this.menuItemRepository.create(createMenuItemDto);
    return await this.menuItemRepository.save(menuItem);
  }

  async findAll(
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: MenuItem[]; totalPages: number; total: number }> {
    const [menuItems, total] = await this.menuItemRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit
    });
    const totalPages = Math.ceil(total / limit);
    return { data: menuItems, totalPages, total };
  }

  async findOne(id: string): Promise<MenuItem> {
    const menuItem = await this.menuItemRepository.findOne({
      where: { id }
    });

    if (!menuItem) {
      throw new ConflictException("Item de cardápio não encontrado");
    }

    menuItem.accessCount += 1;
    await this.menuItemRepository.save(menuItem);
    await this.updatePopularCache();

    return menuItem;
  }

  async updatePopularCache() {
    const popularItems = await this.menuItemRepository.find({
      order: { accessCount: "DESC" },
      take: 5
    });

    await this.menuItemsCacheService.setPopularMenuItems(popularItems);
  }

  async update(
    id: string,
    user: User,
    updateMenuItemDto: UpdateMenuItemDto
  ): Promise<UpdateMenuItemDto> {
    const existingItem = await this.menuItemRepository.findOneBy({ id });
    if (!existingItem) {
      throw new ConflictException("Item de cardápio não existe");
    }

    const restaurant = await this.restaurantRepository.findOne({
      where: { id: existingItem.restaurantId }
    });

    const isUserOwner = restaurant.userId === user.id;

    if (isUserOwner) {
      Object.assign(existingItem, updateMenuItemDto);
      await this.menuItemRepository.save(existingItem);
      return updateMenuItemDto;
    } else {
      throw new UnauthorizedException(
        "Item do menu só pode ser atualizado pelo usuário responsável"
      );
    }
  }

  async remove(id: string, user: User): Promise<void> {
    const item = await this.findOne(id);

    if (!item) {
      throw new ConflictException("Item de cardápio não encontrado");
    }

    const restaurant = await this.restaurantRepository.findOne({
      where: { id: item.restaurantId }
    });

    const isUserOwner = restaurant.userId === user.id;

    if (isUserOwner) {
      await this.menuItemRepository.remove(item);
    } else {
      throw new UnauthorizedException(
        "Item do menu só pode ser removido pelo usuário responsável"
      );
    }
  }
}

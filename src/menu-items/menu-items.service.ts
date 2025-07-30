import { ConflictException, Injectable } from "@nestjs/common";
import { CreateMenuItemDto } from "./dto/create-menu-item.dto";
import { UpdateMenuItemDto } from "./dto/update-menu-item.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { MenuItem } from "./menu-item.entity";
import { Repository } from "typeorm";

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>
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
  ): Promise<{ data: MenuItem[]; totalPages: number }> {
    const [menuItems, total] = await this.menuItemRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit
    });
    const totalPages = Math.ceil(total / limit);
    return { data: menuItems, totalPages };
  }

  async findOne(id: string): Promise<MenuItem> {
    const menuItem = await this.menuItemRepository.findOne({
      where: { id }
    });

    if (!menuItem) {
      throw new ConflictException("Item de cardápio não encontrado");
    }

    return menuItem;
  }

  async update(
    id: string,
    updateMenuItemDto: UpdateMenuItemDto
  ): Promise<UpdateMenuItemDto> {
    const existingItem = await this.menuItemRepository.findOneBy({
      id: updateMenuItemDto.id
    });
    if (!existingItem) {
      throw new ConflictException("Item de cardápio não existe");
    }

    await this.menuItemRepository.update(id, updateMenuItemDto);

    return updateMenuItemDto;
  }

  async remove(id: string): Promise<void> {
    const item = await this.findOne(id);

    if (!item) {
      throw new ConflictException("Item de cardápio não encontrado");
    }

    await this.menuItemRepository.remove(item);
  }
}

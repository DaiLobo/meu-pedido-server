import { Repository } from "typeorm";

import {
  ConflictException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const existingRestaurant = await this.restaurantRepository.findOneBy({
      name: createRestaurantDto.name
    });

    if (existingRestaurant) {
      throw new ConflictException("Restaurante já existe");
    }

    const restaurant = this.restaurantRepository.create(createRestaurantDto);
    return await this.restaurantRepository.save(restaurant);
  }

  async findAll(
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: Restaurant[]; totalPages: number }> {
    const [restaurants, total] = await this.restaurantRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit
    });
    const totalPages = Math.ceil(total / limit);
    return { data: restaurants, totalPages };
  }

  async findOne(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id },
      relations: ["menuItems"]
    });

    if (!restaurant) {
      throw new NotFoundException("Restaurante não encontrado");
    }

    return restaurant;
  }

  async update(
    id: string,
    updateRestaurantDto: UpdateRestaurantDto
  ): Promise<Restaurant> {
    const existingRestaurant = await this.restaurantRepository.findOneBy({
      name: updateRestaurantDto.name
    });

    if (existingRestaurant) {
      throw new ConflictException("Restaurante já existe");
    }

    const restaurant = await this.findOne(id);
    Object.assign(restaurant, updateRestaurantDto); // Atualiza os campos necessários

    return await this.restaurantRepository.save(restaurant); // Salva no banco de dados
  }

  async remove(id: string): Promise<void> {
    const restaurant = await this.findOne(id); // Valida se o restaurante existe
    await this.restaurantRepository.remove(restaurant); // Remove o registro do banco
  }
}

import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { Category } from "../category.enum";

export class CreateRestaurantDto {
  @IsString({ message: "Name should be a string" })
  @IsNotEmpty()
  readonly name: string;

  @IsString({ message: "CNPJ should be a string" })
  @IsNotEmpty()
  readonly cnpj: string;

  @IsString({ message: "Description should be a string" })
  @IsOptional()
  readonly description: string;

  @IsString({ message: "opening_hours" })
  @IsNotEmpty()
  readonly opening_hours: string;

  @IsString({ message: "address" })
  @IsNotEmpty()
  readonly address: string;

  @IsString({ message: "CEP should be a string" })
  readonly cep?: string;

  @IsString({ message: "UF should be a string" })
  readonly uf?: string;

  @IsString({ message: "logo_url" })
  @IsNotEmpty()
  readonly logo_url: string;

  @IsString({ message: "phone" })
  @IsOptional()
  readonly phone: string;

  @IsEnum(Category, {
    message:
      "Categoria inválida. Escolha uma das seguintes categorias: Italiana, Japonesa, Chinesa, Brasileira, Mexicana, Árabe, Vegetariana/Vegana, Fast Food, Café/Bistrô, Churrascaria, Hamburgueria, Pizzaria, Padaria, Sorveteria, Docerias/Confeitarias, Restaurantes"
  })
  readonly category: Category;

  @IsString({ message: "userId should be a string" })
  @IsOptional()
  readonly userId?: string;
}

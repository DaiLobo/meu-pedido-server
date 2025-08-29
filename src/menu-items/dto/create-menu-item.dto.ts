import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID
} from "class-validator";
import { Category } from "../category.enum";

export class CreateMenuItemDto {
  @IsNotEmpty()
  @IsString({ message: "Name should be a string" })
  readonly name: string;

  @IsString({ message: "Description should be a string" })
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsEnum(Category, {
    message:
      "Categoria inválida. Escolha uma das seguintes categorias: Comida, Bebida, Outro"
  })
  @IsString({ message: "Image URL should be a string" })
  readonly imgUrl: string;

  @IsNotEmpty()
  @IsUUID()
  readonly restaurantId: string;
}

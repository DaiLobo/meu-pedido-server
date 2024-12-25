import { IsNotEmpty, IsString } from "class-validator";

export class CreateRestaurantDto {
  @IsString({ message: "Name should be a string" })
  @IsNotEmpty()
  readonly name: string;

  @IsString({ message: "Description should be a string" })
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
  readonly phone: string;

  @IsString({ message: "category" })
  readonly category: string; //ENUM
}

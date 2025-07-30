import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateMenuItemDto {
  @IsNotEmpty()
  @IsString({ message: "Name should be a string" })
  readonly name: string;

  @IsString({ message: "Description should be a string" })
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsString({ message: "Image URL should be a string" })
  readonly imgUrl: string;

  @IsNotEmpty()
  @IsUUID()
  readonly restaurantId: string;
}

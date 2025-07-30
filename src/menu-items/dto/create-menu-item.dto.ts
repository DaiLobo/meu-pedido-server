import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateMenuItemDto {
  @IsNotEmpty()
  @IsString({ message: "Name should be a string" })
  readonly name: string;

  @IsString({ message: "Description should be a string" })
  readonly description: string;

  @IsNotEmpty()
  @IsString({ message: "Price should be a number" })
  readonly price: number;

  @IsString({ message: "Image URL should be a string" })
  readonly imgUrl: string;

  @IsNotEmpty()
  @IsUUID()
  readonly restaurantId: string;

  @IsString({ message: "Created At should be a string" })
  readonly createdAt: string;

  @IsString({ message: "Updated At should be a string" })
  readonly updatedAt: string;
}

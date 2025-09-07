import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrderDto {
  readonly userId?: string;

  @IsString({ message: "restaurantId should be a string" })
  @IsNotEmpty()
  readonly restaurantId: string;

  @IsNotEmpty({ message: "items should not be empty" })
  readonly items: Array<{ menuItemId: string; quantity: number }>;
}

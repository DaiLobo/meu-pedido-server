import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderItemDto {
  @IsString({ message: "orderId should be a string" })
  @IsNotEmpty()
  readonly orderId: string;

  @IsString({ message: "menuItemId should be a string" })
  @IsNotEmpty()
  readonly menuItemId: string;

  @IsNumber({}, { message: "quantity should be a number" })
  readonly quantity: number;

  @IsNumber({}, { message: "price should be a number" })
  readonly price: number;
}

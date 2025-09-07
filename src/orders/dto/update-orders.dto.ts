import { IsEnum } from "class-validator";

import { PartialType } from "@nestjs/mapped-types";

import { Status } from "../status.enum";
import { CreateOrderDto } from "./create-orders.dto";

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsEnum(Status, { message: "status must be a valid enum value" })
  readonly status?: Status;
}

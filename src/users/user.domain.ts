import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from "class-validator";

export class UserDomain {
  @IsOptional()
  @IsString({ message: "Id should be a string" })
  readonly id?: string;

  @IsString({ message: "Name should be a string" })
  @IsNotEmpty({ message: "Name is required" })
  @MinLength(3, { message: "Name should be at least 3 characteres long" })
  @MaxLength(100, { message: "Name should notn exceed 100 characters" })
  readonly name: string;

  @IsString({ message: "Email should be a string" })
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Invalid email format" })
  readonly email: string;

  @IsString({ message: "Password should be a string" })
  @MinLength(6, { message: "Password should be at least 6 characters long" })
  @MaxLength(255, { message: "Password should not exceed 255 characters" })
  readonly password: string;

  @IsOptional()
  @IsString({ message: "Address should be a string" })
  @MinLength(10, { message: "Address should be at least 10 characters long" })
  @MaxLength(255, { message: "Address should not exceed 255 characters" })
  readonly address?: string;

  @IsOptional()
  @IsString({ message: "CEP should be a string" })
  @MinLength(8, { message: "CEP should be at least 8 characters long" })
  @MaxLength(11, { message: "CEP should not exceed 11 characters" })
  readonly cep?: string;

  @IsOptional()
  @IsString({ message: "UF should be a string" })
  readonly uf?: string;

  @IsOptional()
  @IsString({ message: "Phone should be a string" })
  readonly phone?: string;

  @IsOptional()
  @IsDate({ message: "Invalid date format" })
  readonly created_at?: Date;

  @IsOptional()
  @IsDate({ message: "Invalid date format" })
  readonly updated_at?: Date;
}

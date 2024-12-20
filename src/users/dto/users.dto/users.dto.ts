export class UsersDto {
  readonly id?: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly address?: string;
  readonly cep?: string;
  readonly uf?: string;
  readonly phone?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCategoriaToMenuItems1754255478945
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "categoria_enum" AS ENUM ('comida', 'bebida', 'outro');
    `);

    await queryRunner.addColumn(
      "menu_items",
      new TableColumn({
        name: "category",
        type: "category_enum",
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("menu_items", "category");

    await queryRunner.query(`DROP TYPE "category_enum"`);
  }
}

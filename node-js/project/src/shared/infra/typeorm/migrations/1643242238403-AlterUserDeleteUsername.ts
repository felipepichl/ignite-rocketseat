import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

class AlterUserDeleteUsername1643242238403 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "username");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "username",
        type: "varchar",
        isUnique: true,
      })
    );
  }
}

export { AlterUserDeleteUsername1643242238403 };

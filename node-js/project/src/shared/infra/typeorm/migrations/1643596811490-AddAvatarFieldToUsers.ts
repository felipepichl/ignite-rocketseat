import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

class AddAvatarFieldToUsers1643596811490 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "avatar",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "avatar");
  }
}

export { AddAvatarFieldToUsers1643596811490 };

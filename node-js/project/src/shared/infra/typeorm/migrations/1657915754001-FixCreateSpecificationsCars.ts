import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

class FixCreateSpecificationsCars1657915754001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      "specifications_cars",
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        default: "now()",
      })
    );

    await queryRunner.addColumn(
      "specifications_cars",
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        default: "datetime('now')",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("created_at", "specifications_cars");
    await queryRunner.addColumn(
      "specifications_cars",
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        default: "now()",
      })
    );
  }
}

export { FixCreateSpecificationsCars1657915754001 };

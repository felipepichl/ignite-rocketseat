import { MigrationInterface, QueryRunner, Table } from "typeorm";

class CreateCars1657300482401 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cars",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "daily_rate",
            type: "numeric",
          },
          {
            name: "available",
            type: "boolean",
            default: true,
          },
          {
            name: "license_Plate",
            type: "numeric",
          },
          {
            name: "fine_amount",
            type: "numeric",
          },
          {
            name: "brand",
            type: "varchar",
          },
          {
            name: "category_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "fk_category_car",
            referencedTableName: "categories",
            referencedColumnNames: ["id"],
            columnNames: ["category_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cars");
  }
}

export { CreateCars1657300482401 };

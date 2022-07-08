import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class FixLicensePlateCars1657307433527 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      "cars",
      new TableColumn({
        name: "license_Plate",
        type: "numeric",
      })
    );

    await queryRunner.addColumn(
      "cars",
      new TableColumn({
        name: "license_plate",
        type: "varchar",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      "cars",
      new TableColumn({
        name: "license_plate",
        type: "varchar",
      })
    );

    await queryRunner.addColumn(
      "cars",
      new TableColumn({
        name: "license_Plate",
        type: "numeric",
      })
    );
  }
}

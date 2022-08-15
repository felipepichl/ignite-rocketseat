import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersToken1660526427775 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_token",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "refresh_token",
            type: "varchar",
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "expires_date",
            type: "times_tamp",
          },
          {
            name: "created_at",
            type: "times_tamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "fk_users_token",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_token");
  }
}

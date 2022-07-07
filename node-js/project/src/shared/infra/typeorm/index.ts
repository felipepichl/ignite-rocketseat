import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/shared/infra/typeorm/database.sqlite",
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});

AppDataSource.initialize();

export { AppDataSource };

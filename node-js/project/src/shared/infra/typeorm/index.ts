import { DataSource } from "typeorm";

const database = {
  dev: "./src/shared/infra/typeorm/database.sqlite",
  test: "./src/shared/infra/typeorm/database_test.sqlite",
};

const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.NODE_ENV === "test" ? database.test : database.dev,
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});

AppDataSource.initialize();

export { AppDataSource };

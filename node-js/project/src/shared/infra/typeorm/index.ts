import { DataSource } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

const database = {
  dev: "./src/shared/infra/typeorm/database.sqlite",
  test: "./src/shared/infra/typeorm/database_test.sqlite",
};

const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.NODE_ENV === "test" ? database.test : database.dev,
  entities: [User, UserTokens, Car, CarImage, Category, Specification, Rental],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  synchronize: false,
});

// AppDataSource.initialize();

function createConnection(host = "database"): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}

export { createConnection, AppDataSource };

// export { AppDataSource };
// entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],

import { DataSource } from "typeorm";

/**
 * Models
 */
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
/**
 * Migrations
 */
import { CreateCategories1642026097183 } from "@shared/infra/typeorm/migrations/1642026097183-CreateCategories";
import { CreateSpecifications1642556108145 } from "@shared/infra/typeorm/migrations/1642556108145-CreateSpecifications";
import { CreateUsers1642989944458 } from "@shared/infra/typeorm/migrations/1642989944458-CreateUsers";
import { AlterUserDeleteUsername1643242238403 } from "@shared/infra/typeorm/migrations/1643242238403-AlterUserDeleteUsername";
import { AddAvatarFieldToUsers1643596811490 } from "@shared/infra/typeorm/migrations/1643596811490-AddAvatarFieldToUsers";
import { CreateCars1657300482401 } from "@shared/infra/typeorm/migrations/1657300482401-CreateCars";
import { FixLicensePlateCars1657307433527 } from "@shared/infra/typeorm/migrations/1657307433527-FixLicensePlateCars";
import { CreateSpecificationsCars1657683138779 } from "@shared/infra/typeorm/migrations/1657683138779-CreateSpecificationsCars";
import { FixCreateSpecificationsCars1657915754001 } from "@shared/infra/typeorm/migrations/1657915754001-FixCreateSpecificationsCars";
import { CreateCarImages1658073627153 } from "@shared/infra/typeorm/migrations/1658073627153-CreateCarImages";
import { CreateRentals1658529996539 } from "@shared/infra/typeorm/migrations/1658529996539-CreateRentals";
import { CreateUsersToken1660526427775 } from "@shared/infra/typeorm/migrations/1660526427775-CreateUsersToken";

const database = {
  dev: "./src/shared/infra/typeorm/database.sqlite",
  test: "./src/shared/infra/typeorm/database_test.sqlite",
};

const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.NODE_ENV === "test" ? database.test : database.dev,
  entities: [User, UserTokens, Car, CarImage, Category, Specification, Rental],
  migrations: [
    CreateCategories1642026097183,
    CreateSpecifications1642556108145,
    CreateUsers1642989944458,
    AlterUserDeleteUsername1643242238403,
    AddAvatarFieldToUsers1643596811490,
    CreateCars1657300482401,
    FixLicensePlateCars1657307433527,
    CreateSpecificationsCars1657683138779,
    FixCreateSpecificationsCars1657915754001,
    CreateCarImages1658073627153,
    CreateRentals1658529996539,
    CreateUsersToken1660526427775,
  ],
  synchronize: false,
  subscribers: [],
});

function createConnection(host = "database"): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}

export { createConnection, AppDataSource };

// AppDataSource.initialize();
// export { AppDataSource };
// entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
// migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
// -d src/shared/infra/typeorm/index.ts

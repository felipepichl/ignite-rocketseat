// import dayjs from "dayjs";

// import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
// import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalRepositoryInMemory";
// import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
// import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalRepositoryInMemory;
// let inMemoryDateProvider: DayjsDateProvider;
// let carRepositoryInMemory: CarRepositoryInMemory;

// let rental: ICreateRentalDTO;

describe("Create Rentals", () => {
  // const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    // inMemoryDateProvider = new DayjsDateProvider();
    // carRepositoryInMemory = new CarRepositoryInMemory();

    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory
      // inMemoryDateProvider,
      // carRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "user_id",
      car_id: "car_id",
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: new Date(),
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
});

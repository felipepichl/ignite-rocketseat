// import dayjs from "dayjs";

import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
// import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
// import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalRepositoryInMemory;
let inMemoryDateProvider: DayjsDateProvider;
let carRepositoryInMemory: CarRepositoryInMemory;

// let rental: ICreateRentalDTO;

describe("Create Rentals", () => {
  // const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(async () => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    inMemoryDateProvider = new DayjsDateProvider();
    carRepositoryInMemory = new CarRepositoryInMemory();

    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      inMemoryDateProvider,
      carRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    await createRentalUseCase.execute({});
  });
});

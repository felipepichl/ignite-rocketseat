import dayjs from "dayjs";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalRepositoryInMemory: RentalRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let inMemoryDateProvider: DayjsDateProvider;

let rental: ICreateRentalDTO;

describe("Create Rentals", () => {
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    inMemoryDateProvider = new DayjsDateProvider();

    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      inMemoryDateProvider
    );

    rental = {
      car_id: "car_id",
      user_id: "user_id",
      expected_return_date: dayjs().add(1, "day").toDate(),
    };
  });

  it("should be able to create a new rental", async () => {
    const createdRental = await createRentalUseCase.execute(rental);

    expect(createdRental).toHaveProperty("id");
    expect(createdRental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental for a not available car", async () => {
    await createRentalUseCase.execute(rental);

    await expect(createRentalUseCase.execute(rental)).rejects.toBeInstanceOf(
      AppError
    );
  });

  it("should not be able to create a new rental in progress for a user", async () => {
    await createRentalUseCase.execute(rental);

    await expect(createRentalUseCase.execute(rental)).rejects.toBeInstanceOf(
      AppError
    );
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "car_id",
        user_id: "user_id",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalRepositoryInMemory: RentalRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

let rental: ICreateRentalDTO;

describe("Create Rentals", () => {
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();

    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory);

    rental = {
      car_id: "car_id",
      user_id: "user_id",
      expected_return_date: new Date(),
    };
  });

  it("should be able to create a new rental", async () => {
    const createdRental = await createRentalUseCase.execute(rental);

    expect(createdRental).toHaveProperty("id");
  });

  it("should not be able to create a new rental for a not available car", async () => {
    await createRentalUseCase.execute(rental);

    await expect(createRentalUseCase.execute(rental)).rejects.toBeInstanceOf(
      AppError
    );
  });
});

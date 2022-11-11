import { AppError } from "@shared/errors/AppError";

import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rentals", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should be able to create a new Rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "user_id",
      car_id: "car_id",
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new Rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "user_id",
        car_id: "car_id",
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: "user_id",
        car_id: "car_id",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new Rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "user_id",
        car_id: "car_id",
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: "user_id_wrong",
        car_id: "car_id",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

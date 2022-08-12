import dayjs from "dayjs";

import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalRepositoryInMemory: RentalRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let inMemoryDateProvider: DayjsDateProvider;
let carRepositoryInMemory: CarRepositoryInMemory;

let rental: ICreateRentalDTO;

describe("Create Rentals", () => {
  beforeEach(async () => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    inMemoryDateProvider = new DayjsDateProvider();
    carRepositoryInMemory = new CarRepositoryInMemory();

    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      inMemoryDateProvider,
      carRepositoryInMemory
    );

    const car = await carRepositoryInMemory.create({
      name: "Example name",
      description: "Example description",
      daily_rate: 100,
      available: true,
      license_plate: "Example license plate",
      fine_amount: 33,
      brand: "Example brand",
      category_id: "category_id",
    });

    rental = {
      car_id: car.id,
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

    await expect(createRentalUseCase.execute(rental)).rejects.toEqual(
      new AppError("Car does not available")
    );
  });

  it("should not be able to create a new rental in progress for a user", async () => {
    await createRentalUseCase.execute(rental);

    await expect(createRentalUseCase.execute(rental)).rejects.toEqual(
      new AppError("Car does not available")
    );
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "car.id",
        user_id: "user_id",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time"));
  });
});

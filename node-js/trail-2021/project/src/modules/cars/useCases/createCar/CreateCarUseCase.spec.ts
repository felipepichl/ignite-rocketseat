import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carRepositoryInMemory: CarRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

let car: ICreateCarDTO;

describe("Create Car", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();

    createCarUseCase = new CreateCarUseCase(carRepositoryInMemory);

    car = {
      name: "Example name",
      description: "Example description",
      daily_rate: 100,
      available: true,
      license_plate: "Example license plate",
      fine_amount: 33,
      brand: "Example brand",
      fk_category_id: "category_id",
    };
  });

  it("should be able to create a new car", async () => {
    const createdCar = await createCarUseCase.execute(car);

    expect(createdCar).toHaveProperty("id");
  });

  it("should not be able to create a new car with exists license plate", async () => {
    await createCarUseCase.execute(car);

    await expect(createCarUseCase.execute(car)).rejects.toEqual(
      new AppError("Car already exists")
    );
  });

  it("should be able to create a new car with available true by default", async () => {
    const createdCar = await createCarUseCase.execute(car);

    expect(createdCar.available).toBe(true);
  });
});

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carRepositoryInMemory: CarRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();

    createCarUseCase = new CreateCarUseCase(carRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car: ICreateCarDTO = {
      name: "Example name",
      description: "Example description",
      daily_rate: 100,
      license_plate: "Example license plate",
      fine_amount: 33,
      brand: "Example brand",
      category_id: "category_id",
    };

    await createCarUseCase.execute(car);
  });
});

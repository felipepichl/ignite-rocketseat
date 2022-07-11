import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";

import { ListCarUseCase } from "./ListCarUseCase";

let carRepositoryInMemory: CarRepositoryInMemory;
let listCarUseCase: ListCarUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    listCarUseCase = new ListCarUseCase(carRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Car_01",
      description: "car_description",
      daily_rate: 100,
      license_plate: "XXXI66K",
      fine_amount: 33,
      brand: "car_brand",
      category_id: "category_id",
    });

    const cars = await listCarUseCase.execute();

    expect(cars).toEqual([car]);
  });
});

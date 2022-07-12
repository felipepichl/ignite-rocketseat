import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";

import { ListCarUseCase } from "./ListCarUseCase";

let carRepositoryInMemory: CarRepositoryInMemory;
let listCarUseCase: ListCarUseCase;

let car: ICreateCarDTO;

describe("List Cars", () => {
  beforeEach(async () => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    listCarUseCase = new ListCarUseCase(carRepositoryInMemory);

    car = await carRepositoryInMemory.create({
      name: "Car_01",
      description: "car_description",
      daily_rate: 100,
      license_plate: "XXXI66K",
      fine_amount: 33,
      brand: "car_brand",
      category_id: "category_id",
    });
  });

  it("should be able to list all available cars", async () => {
    const cars = await listCarUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const cars = await listCarUseCase.execute({
      name: car.name,
    });

    expect(cars).toEqual([car]);
  });
});

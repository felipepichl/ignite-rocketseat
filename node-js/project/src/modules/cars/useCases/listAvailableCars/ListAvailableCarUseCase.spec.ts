import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";

import { ListAvailableCarUseCase } from "./ListAvailableCarUseCase";

let carRepositoryInMemory: CarRepositoryInMemory;
let listAvailableCarUseCase: ListAvailableCarUseCase;

let car: ICreateCarDTO;

describe("List Cars", () => {
  beforeEach(async () => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    listAvailableCarUseCase = new ListAvailableCarUseCase(
      carRepositoryInMemory
    );

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
    const cars = await listAvailableCarUseCase.execute({});

    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by name", async () => {
    const cars = await listAvailableCarUseCase.execute({
      name: car.name,
    });

    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by brand", async () => {
    const cars = await listAvailableCarUseCase.execute({
      brand: car.brand,
    });

    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by category_id", async () => {
    const cars = await listAvailableCarUseCase.execute({
      category_id: car.category_id,
    });

    expect(cars).toEqual([car]);
  });
});

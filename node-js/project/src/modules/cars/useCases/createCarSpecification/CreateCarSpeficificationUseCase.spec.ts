import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";

import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { CreateCarSpeficificationUseCase } from "./CreateCarSpeficificationUseCase";

let createCarSpeficificationUseCase: CreateCarSpeficificationUseCase;
let carsRepositoryInMemory: CarRepositoryInMemory;

let createCarUseCase: CreateCarUseCase;
let car: ICreateCarDTO;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarRepositoryInMemory();
    createCarSpeficificationUseCase = new CreateCarSpeficificationUseCase(
      carsRepositoryInMemory
    );

    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);

    car = {
      name: "Example name",
      description: "Example description",
      daily_rate: 100,
      license_plate: "Example license plate",
      fine_amount: 33,
      brand: "Example brand",
      category_id: "category_id",
    };
  });

  it("should be able to add a new specification to the car", async () => {
    const createdCar = await createCarUseCase.execute(car);

    const { id } = createdCar;

    await createCarSpeficificationUseCase.execute({
      car_id: id,
    });
  });
});

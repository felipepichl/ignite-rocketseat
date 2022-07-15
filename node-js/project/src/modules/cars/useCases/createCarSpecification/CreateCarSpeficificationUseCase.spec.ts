import { ICreateSpecificationDTO } from "@modules/cars/dtos/CreateSpecificationDTO";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { CreateSpecificationUseCase } from "../createSpecification/CreateSpecificationUseCase";
import { CreateCarSpeficificationUseCase } from "./CreateCarSpeficificationUseCase";

let createCarSpeficificationUseCase: CreateCarSpeficificationUseCase;
let carsRepositoryInMemory: CarRepositoryInMemory;

let createCarUseCase: CreateCarUseCase;
let car: ICreateCarDTO;

let specificationRepositoryInMemory: SpecificationRepositoryInMemory;
let createSpecificationUseCase: CreateSpecificationUseCase;
let specification: ICreateSpecificationDTO;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();

    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);

    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationRepositoryInMemory
    );

    createCarSpeficificationUseCase = new CreateCarSpeficificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );

    specification = {
      name: "Example Specification name",
      description: "Example Specification description",
    };

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

    await createSpecificationUseCase.execute(specification);

    const createdSpecification =
      await specificationRepositoryInMemory.findByName(specification.name);

    const specifications_ids = [createdSpecification.id];

    await createCarSpeficificationUseCase.execute({
      car_id: id,
      specifications_ids,
    });
  });

  it("should not be able to add a new specification with a non-existing car", async () => {
    const car_id = "non-existing";
    const specifications_ids = ["specifications_ids"];

    await expect(
      createCarSpeficificationUseCase.execute({
        car_id,
        specifications_ids,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

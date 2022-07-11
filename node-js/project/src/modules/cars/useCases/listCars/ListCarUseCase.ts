// import { injectable, inject } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class ListCarUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute(): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable();

    return cars;
  }
}

export { ListCarUseCase };

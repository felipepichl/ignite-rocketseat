import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<void> {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);
  }

  async findByLicensePlate(licnse_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === licnse_plate);
  }
}

export { CarRepositoryInMemory };

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    let availableCar = this.cars.filter((car) => car.available);

    if (!category_id && !brand && !name) return availableCar;

    availableCar = availableCar.filter((car) => {
      if (car.category_id === category_id) return true;
      if (car.brand === brand) return true;
      if (car.name === name) return true;

      return false;
    });

    return availableCar;
  }
  async findById(car_id: string): Promise<Car> {
    return this.cars.find((car) => car.id === car_id);
  }
  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}

export { CarRepositoryInMemory };

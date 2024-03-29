import { Car } from "@modules/cars/infra/prisma/models/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { injectable, inject } from "tsyringe";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      category_id,
      brand,
      name
    );

    return cars;
  }
}

export { ListAvailableCarUseCase };

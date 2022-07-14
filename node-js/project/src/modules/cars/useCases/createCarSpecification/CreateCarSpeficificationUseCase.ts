import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_ids: string[];
}

class CreateCarSpeficificationUseCase {
  constructor(
    private carsRepository: ICarsRepository,
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_ids }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Cars does not exists");
    }

    carExists.specifications = await this.specificationsRepository.findByIds(
      specifications_ids
    );
  }
}

export { CreateCarSpeficificationUseCase };

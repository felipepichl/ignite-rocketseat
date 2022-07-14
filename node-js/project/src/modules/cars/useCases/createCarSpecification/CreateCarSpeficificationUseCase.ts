import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_ids: string[];
}

class CreateCarSpeficificationUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({ car_id, specifications_ids }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Cars does not exists");
    }
  }
}

export { CreateCarSpeficificationUseCase };

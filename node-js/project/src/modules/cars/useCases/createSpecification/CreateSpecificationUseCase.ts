import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const speacificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (speacificationAlreadyExists) {
      throw new AppError("Speficication already exists");
    }

    const specification = await this.specificationsRepository.create({
      name,
      description,
    });

    return specification;
  }
}

export { CreateSpecificationUseCase };

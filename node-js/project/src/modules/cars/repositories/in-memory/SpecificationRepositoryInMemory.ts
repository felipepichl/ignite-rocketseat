import { ICreateSpecificationDTO } from "@modules/cars/dtos/CreateSpecificationDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import { ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  async create(data: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, data);

    this.specifications.push(specification);
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }
}

export { SpecificationRepositoryInMemory };

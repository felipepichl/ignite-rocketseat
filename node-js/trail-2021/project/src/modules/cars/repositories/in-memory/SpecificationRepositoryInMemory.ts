import { ICreateSpecificationDTO } from "@modules/cars/dtos/CreateSpecificationDTO";
import { Specification } from "@modules/cars/infra/prisma/models/Specification";

import { ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  async create(data: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, data);

    this.specifications.push(specification);

    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );
    return allSpecifications;
    // const findIds = this.specifications.filter((specification) => {
    //   return ids.forEach((id) => {
    //     return id === specification.id;
    //   });
    // });
    // return findIds;
  }
}

export { SpecificationRepositoryInMemory };

import { getRepository, Repository } from "typeorm";

import { ICreateSpecificationDTO } from "../../dtos/CreateSpecificationDTO";
import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  // private static INSTANCE: SpecificationRepository;

  constructor() {
    this.repository = getRepository(Specification);
  }

  // public static getIntance(): SpecificationRepository {
  //   if (!SpecificationRepository.INSTANCE) {
  //     SpecificationRepository.INSTANCE = new SpecificationRepository();
  //   }

  //   return SpecificationRepository.INSTANCE;
  // }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne(name);

    return specification;
  }
}

export { SpecificationsRepository };

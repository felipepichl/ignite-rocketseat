import { In, Repository } from "typeorm";

import { ICreateSpecificationDTO } from "@modules/cars/dtos/CreateSpecificationDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppDataSource } from "@shared/infra/typeorm";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ where: { name } });

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findBy({
      id: In(ids),
    });
  }
}

export { SpecificationsRepository };

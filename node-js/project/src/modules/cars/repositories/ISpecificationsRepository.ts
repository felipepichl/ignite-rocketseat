import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import { ICreateSpecificationDTO } from "../dtos/CreateSpecificationDTO";

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository };

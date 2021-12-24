import { ICreateSpecificationDTO } from "../dtos/CreateSpecificationDTO";
import { Specification } from "../model/Specification";

interface ISpecificationRepository {
  create(data: ICreateSpecificationDTO): void;
  findByName(name: string): Specification;
}

export { ISpecificationRepository };

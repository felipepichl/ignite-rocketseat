import { ICreateSpecificationDTO } from "@modules/cars/dtos/CreateSpecificationDTO";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

import { prisma } from "@shared/infra/prisma";

import { Specification } from "../models/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  async create(data: ICreateSpecificationDTO): Promise<Specification> {
    const result = await prisma.specification.create({
      data,
    });

    return result;
  }

  async findByName(name: string): Promise<Specification> {
    const result = await prisma.specification.findFirst({
      where: { name },
    });

    return result;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const result = await prisma.specification.findMany({
      where: { id: { in: ids } },
    });

    return result;
  }
}

export { SpecificationsRepository };

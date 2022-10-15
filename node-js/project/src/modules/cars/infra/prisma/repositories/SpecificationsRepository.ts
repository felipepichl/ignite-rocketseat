import { ICreateSpecificationDTO } from "@modules/cars/dtos/CreateSpecificationDTO";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { PrismaClient } from "@prisma/client";

import { Specification } from "../models/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: ICreateSpecificationDTO): Promise<Specification> {
    const result = await this.prisma.specification.create({
      data,
    });

    return result;
  }

  async findByName(name: string): Promise<Specification> {
    const result = await this.prisma.specification.findFirst({
      where: { name },
    });

    return result;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const result = await this.prisma.specification.findMany({
      where: { id: { in: ids } },
    });

    return result;
  }
}

export { SpecificationsRepository };

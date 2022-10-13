import { ICreateCategoryDTO } from "@modules/cars/dtos/CreateCategoryDTO";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { PrismaClient } from "@prisma/client";

import { Category } from "../models/Category";

class CategoriesRepository implements ICategoriesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: ICreateCategoryDTO): Promise<void> {
    await this.prisma.category.create({
      data,
    });
  }

  async list(): Promise<Category[]> {
    const result = await this.prisma.category.findMany();

    return result;
  }

  async findByName(name: string): Promise<Category> {
    const result = await this.prisma.category.findFirst({
      where: {
        name,
      },
    });

    return result;
  }
}

export { CategoriesRepository };

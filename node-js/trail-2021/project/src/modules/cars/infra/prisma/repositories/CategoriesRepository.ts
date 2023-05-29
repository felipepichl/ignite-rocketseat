import { ICreateCategoryDTO } from "@modules/cars/dtos/CreateCategoryDTO";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

import { prisma } from "@shared/infra/prisma";

import { Category } from "../models/Category";

class CategoriesRepository implements ICategoriesRepository {
  async create(data: ICreateCategoryDTO): Promise<void> {
    await prisma.category.create({
      data,
    });
  }

  async list(): Promise<Category[]> {
    const result = await prisma.category.findMany();

    return result;
  }

  async findByName(name: string): Promise<Category> {
    const result = await prisma.category.findFirst({
      where: {
        name,
      },
    });

    return result;
  }
}

export { CategoriesRepository };

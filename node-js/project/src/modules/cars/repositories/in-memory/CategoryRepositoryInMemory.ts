import { v4 as uuid } from "uuid";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";

import { ICreateCategoryDTO } from "../../dtos/CreateCategoryDTO";
import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoryRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  async create(data: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, { id: uuid() }, data);

    this.categories.push(category);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export { CategoryRepositoryInMemory };

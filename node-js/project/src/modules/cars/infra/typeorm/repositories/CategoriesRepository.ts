import { Repository } from "typeorm";

import { ICreateCategoryDTO } from "@modules/cars/dtos/CreateCategoryDTO";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppDataSource } from "@shared/infra/typeorm";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  public async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({ name, description });

    await this.repository.save(category);
  }

  public async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  public async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ where: { name } });

    return category;
  }
}

export { CategoriesRepository };

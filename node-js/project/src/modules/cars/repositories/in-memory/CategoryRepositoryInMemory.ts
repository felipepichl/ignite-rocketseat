import { ICreateCategoryDTO } from "../../dtos/CreateCategoryDTO";
import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoryRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  async create(data: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, data);

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

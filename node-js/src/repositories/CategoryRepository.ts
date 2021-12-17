import { ICreateCategoryDTO } from "../dtos/CreateCategoryDTO";
import { Category } from "../model/Category";

class CategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  public create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, { name, description, created_at: new Date() });

    this.categories.push(category);
  }

  public list(): Category[] {
    return this.categories;
  }
}

export { CategoryRepository };

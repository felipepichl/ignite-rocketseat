import { ICreateCategoryDTO } from "../../dtos/CreateCategoryDTO";
import { Category } from "../../entities/Category";
import { ICategoryRepository } from "../ICategoryRepository";

class CategoryRepository implements ICategoryRepository {
  private categories: Category[];

  private static INSTANCE: CategoryRepository;

  private constructor() {
    this.categories = [];
  }

  public static getIntance(): CategoryRepository {
    if (!CategoryRepository.INSTANCE) {
      CategoryRepository.INSTANCE = new CategoryRepository();
    }

    return CategoryRepository.INSTANCE;
  }

  public create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, { name, description, created_at: new Date() });

    this.categories.push(category);
  }

  public list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export { CategoryRepository };

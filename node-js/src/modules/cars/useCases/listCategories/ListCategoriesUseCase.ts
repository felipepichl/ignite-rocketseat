import { Category } from "modules/cars/model/Category";
import { ICategoryRepository } from "modules/cars/repositories/ICategoryRepository";

class ListCategoriesUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  execute(): Category[] {
    const categories = this.categoryRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };

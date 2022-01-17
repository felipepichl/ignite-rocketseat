import { ICreateCategoryDTO } from "../dtos/CreateCategoryDTO";
import { Category } from "../entities/Category";

interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<void>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}

export { ICategoriesRepository };

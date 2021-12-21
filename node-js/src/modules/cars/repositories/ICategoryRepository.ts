import { ICreateCategoryDTO } from "../dtos/CreateCategoryDTO";
import { Category } from "../model/Category";

interface ICategoryRepository {
  create(date: ICreateCategoryDTO): void;
  list(): Category[];
  findByName(name: string): Category;
}

export { ICategoryRepository };

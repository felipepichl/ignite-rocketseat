import { ICreateCategoryDTO } from "../dtos/CreateCategoryDTO";
import { Category } from "../entities/Category";

interface ICategoryRepository {
  create(data: ICreateCategoryDTO): void;
  list(): Category[];
  findByName(name: string): Category;
}

export { ICategoryRepository };

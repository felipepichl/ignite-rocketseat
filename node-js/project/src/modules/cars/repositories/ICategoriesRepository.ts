import { Category } from "@modules/cars/infra/typeorm/entities/Category";

import { ICreateCategoryDTO } from "../dtos/CreateCategoryDTO";

interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<void>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}

export { ICategoriesRepository };

import { CategoryRepository } from "modules/cars/repositories/implementations/CategoryRepository";

import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const categoryRepository = CategoryRepository.getIntance();

const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository);

const importCategotyController = new ImportCategoryController(
  importCategoryUseCase
);

export { importCategotyController };

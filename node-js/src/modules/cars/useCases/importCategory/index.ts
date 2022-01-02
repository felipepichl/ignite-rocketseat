import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const importCategoryUseCase = new ImportCategoryUseCase();

const importCategotyController = new ImportCategoryController(
  importCategoryUseCase
);

export { importCategotyController };

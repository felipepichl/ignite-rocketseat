import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

import { enshureAdmin } from "../middlewares/enshureAdmin";
import { enshureAuthenticated } from "../middlewares/enshureAuthenticated";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
  "/",
  enshureAuthenticated,
  enshureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get(
  "/",
  enshureAuthenticated,
  listCategoriesController.handle
);

categoriesRoutes.post(
  "/import",
  enshureAuthenticated,
  enshureAdmin,
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };

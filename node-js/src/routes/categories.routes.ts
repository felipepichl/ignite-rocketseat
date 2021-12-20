import { Router } from "express";

import { CategoryRepository } from "../repositories/CategoryRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRoutes = Router();
const categoryRepository = new CategoryRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const service = new CreateCategoryService(categoryRepository);

  service.execute({
    name,
    description,
  });

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const repository = new CategoryRepository();

  const categories = repository.list();

  return response.json({ categories });
});

export { categoriesRoutes };

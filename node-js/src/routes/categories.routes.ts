import { Router } from "express";

import { CategoryRepository } from "../repositories/CategoryRepository";

const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const repository = new CategoryRepository();

  const categoryAlreadyExists = repository.findByName(name);

  if (categoryAlreadyExists) {
    return response.status(400).json({ error: "Category already exists" });
  }

  repository.create({
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

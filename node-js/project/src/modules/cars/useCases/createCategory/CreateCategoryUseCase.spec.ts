import "reflect-metadata";
import { CategoryRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoryRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();

    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Name example",
      description: "Description example",
    };

    await createCategoryUseCase.execute(category);

    const result = await categoryRepositoryInMemory.findByName(category.name);

    expect(result).toHaveProperty("id");
  });

  it("should not be able to create a new category with same name from another", async () => {
    await createCategoryUseCase.execute({
      name: "Name example",
      description: "Description example",
    });

    await expect(
      createCategoryUseCase.execute({
        name: "Name example",
        description: "Description example",
      })
    ).rejects.toEqual(new AppError("Category already exists"));
  });
});

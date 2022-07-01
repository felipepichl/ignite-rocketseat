import "reflect-metadata";

import { CategoryRepositoryInMemory } from "../../repositories/in-memory/CategoryRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
  beforeEach(() => {
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = await createCategoryUseCase.execute({
      name: "Name example",
      description: "Description example",
    });

    console.log(category);

    expect(category).toHaveProperty("id");
  });
});

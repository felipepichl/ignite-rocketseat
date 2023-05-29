import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;

describe("Create Users", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "Test",
      email: "test@test.com",
      password: "hash123",
      driver_license: "AB",
    });

    expect(user).toHaveProperty("id");
  });
});

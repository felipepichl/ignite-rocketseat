import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";

import { AppError } from "@shared/errors/AppError";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      userRepositoryInMemory
    );
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "John Due",
      email: "johndue@example.com",
      password: "hash123",
      driver_license: "AB",
    };

    await createUserUseCase.execute(user);

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty("token");
  });

  it("should not be able to authenticate with non existing user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "non.existing@example.com",
        password: "hash123",
      })
    ).rejects.toEqual(new AppError("Incorrect email/password combination"));
  });

  it("should not be able to authenticate with wrong password", async () => {
    const user: ICreateUserDTO = {
      name: "John Due",
      email: "johndue@example.com",
      password: "hash123",
      driver_license: "AB",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: "johndue@example.com",
        password: "wrong-password",
      })
    ).rejects.toEqual(new AppError("Incorrect email/password combination"));
  });
});

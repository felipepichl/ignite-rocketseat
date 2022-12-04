import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/prisma/models/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const usersAlreadyExists = await this.usersRepository.findByEmail(email);

    if (usersAlreadyExists) {
      throw new AppError("Users already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });

    return user;
  }
}

export { CreateUserUseCase };

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { prisma } from "@shared/infra/prisma";

import { User } from "../models/User";

class UsersRepository implements IUsersRepository {
  async create(data: ICreateUserDTO): Promise<User> {
    const result = await prisma.user.create({
      data,
    });

    return result;
  }
  async list(): Promise<User[]> {
    const result = await prisma.user.findMany();

    return result;
  }
  async findByEmail(email: string): Promise<User> {
    const result = await prisma.user.findFirst({
      where: { email },
    });

    return result;
  }
  async findById(user_id: string): Promise<User> {
    const result = await prisma.user.findUnique({
      where: { id: user_id },
    });

    return result;
  }
}

export { UsersRepository };

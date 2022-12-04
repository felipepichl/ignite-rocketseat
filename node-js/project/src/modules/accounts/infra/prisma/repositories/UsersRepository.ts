import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { PrismaClient } from "@prisma/client";

import { User } from "../models/User";

class UsersRepository implements IUsersRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const result = await this.prisma.user.create({
      data,
    });

    return result;
  }
  async list(): Promise<User[]> {
    const result = await this.prisma.user.findMany();

    return result;
  }
  async findByEmail(email: string): Promise<User> {
    const result = await this.prisma.user.findFirst({
      where: { email },
    });

    return result;
  }
  async findById(user_id: string): Promise<User> {
    const result = await this.prisma.user.findUnique({
      where: { id: user_id },
    });

    return result;
  }
}

export { UsersRepository };

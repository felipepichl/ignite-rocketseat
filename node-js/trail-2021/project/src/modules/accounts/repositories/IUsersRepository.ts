import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

import { User } from "../infra/prisma/models/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  list(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  findById(user_id: string): Promise<User>;
}

export { IUsersRepository };

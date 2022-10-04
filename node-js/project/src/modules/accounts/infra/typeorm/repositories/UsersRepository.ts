import { Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import dataSource from "@shared/infra/typeorm";

class UsersRepository implements IUsersRepository<User> {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<void> {
    const user = this.repository.create(data);

    await this.repository.save(user);
  }
  public async list(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }
  public async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }
  public async findById(user_id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id: user_id } });

    return user;
  }
}

export { UsersRepository };

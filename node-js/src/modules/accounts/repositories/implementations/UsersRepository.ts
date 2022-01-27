import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
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
    const user = await this.repository.findOne({ email });

    return user;
  }
}

export { UsersRepository };
import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { UserTokens } from "@modules/accounts/infra/prisma/models/UserTokens";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UserTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserTokens[] = [];

  async create(data: ICreateUserTokensDTO): Promise<UserTokens> {
    const userTokens = new UserTokens();

    Object.assign(userTokens, data);

    this.usersTokens.push(userTokens);

    return userTokens;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.usersTokens.find(
      (userTokens) =>
        userTokens.fk_user_id === user_id &&
        userTokens.refresh_token === refresh_token
    );
  }

  async deleteById(id: string): Promise<void> {
    const index = this.usersTokens.findIndex(
      (userTokens) => userTokens.id === id
    );

    this.usersTokens.splice(index);
  }
}

export { UserTokensRepositoryInMemory };

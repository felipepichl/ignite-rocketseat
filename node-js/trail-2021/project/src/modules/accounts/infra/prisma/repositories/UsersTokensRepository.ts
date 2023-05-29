import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { prisma } from "@shared/infra/prisma";

import { UserTokens } from "../models/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokensDTO): Promise<UserTokens> {
    const result = await prisma.userTokens.create({
      data: {
        expires_date,
        refresh_token,
        fk_user_id: user_id,
      },
    });

    return result;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const result = await prisma.userTokens.findFirst({
      where: {
        fk_user_id: user_id,
        AND: {
          refresh_token,
        },
      },
      include: { user: true },
    });

    console.log(result);

    return result;
  }

  async deleteById(id: string): Promise<void> {
    await prisma.userTokens.delete({
      where: {
        id,
      },
    });
  }
}
export { UsersTokensRepository };

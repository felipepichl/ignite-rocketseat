import { verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { authConfig } from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

interface IRequest {
  token: string;
}

interface IPayload {
  sub: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute({ token }: IRequest): Promise<void> {
    const decode = verify(token, authConfig.secret_refresh_token) as IPayload;

    const { sub: user_id } = decode;

    await this.usersTokensRepository.findByUserId(user_id);
  }
}

export { RefreshTokenUseCase };

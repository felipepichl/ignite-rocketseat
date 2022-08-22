import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { authConfig } from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/model/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  token: string;
}

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ token }: IRequest): Promise<void> {
    const decode = verify(token, authConfig.secret_refresh_token) as IPayload;

    const { sub: user_id, email } = decode;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh token does not exists");
    }

    const { id } = userToken;

    await this.usersTokensRepository.deleteById(id);

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days
    );

    const refresh_token = sign({ email }, authConfig.secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    });
  }
}

export { RefreshTokenUseCase };

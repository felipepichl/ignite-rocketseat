import { injectable, inject } from "tsyringe";
import { v4 as uuid } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/model/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists");
    }

    const token = uuid();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token: token,
      expires_date,
    });
  }
}

export { SendForgotPasswordMailUseCase };

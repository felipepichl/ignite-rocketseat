import { injectable, inject } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const user = this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists");
    }
  }
}

export { SendForgotPasswordMailUseCase };

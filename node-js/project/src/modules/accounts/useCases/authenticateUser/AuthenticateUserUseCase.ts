import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { authConfig } from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokensRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination", 400);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Incorrect email/password combination", 400);
    }

    const {
      secret,
      expiresIn,
      secret_refresh_token,
      expires_in_refresh_token,
    } = authConfig;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    await this.usersTokenRepository.create({
      user_id: user.id,
      expires_date,
      refresh_token,
    });

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };

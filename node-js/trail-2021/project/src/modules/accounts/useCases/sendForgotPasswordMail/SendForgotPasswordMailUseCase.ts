import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { resolve } from "path";
import { injectable, inject } from "tsyringe";
import { v4 as uuid } from "uuid";

import { IDateProvider } from "@shared/container/providers/DateProvider/model/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/model/IMailProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("MailProvider")
    private mailProvide: IMailProvider
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    if (!user) {
      throw new AppError("User does not exists");
    }

    const token = uuid();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: token,
      expires_date,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvide.sendMail(
      email,
      "Recuperação de Senha",
      variables,
      templatePath
    );
  }
}

export { SendForgotPasswordMailUseCase };

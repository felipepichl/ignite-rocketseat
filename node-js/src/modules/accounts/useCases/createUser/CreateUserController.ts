import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password, driver_license } = request.body;

    const createUseUseCase = container.resolve(CreateUserUseCase);

    await createUseUseCase.execute({
      name,
      username,
      email,
      password,
      driver_license,
    });

    return response.status(200).send();
  }
}

export { CreateUserController };

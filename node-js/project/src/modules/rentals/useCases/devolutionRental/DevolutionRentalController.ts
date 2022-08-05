import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentalUseCase } from "./DevolutionRentaluseCase";

class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    devolutionRentalUseCase.execute();

    return response.send();
  }
}

export { DevolutionRentalController };

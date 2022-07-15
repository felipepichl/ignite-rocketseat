import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpeficificationUseCase } from "./CreateCarSpeficificationUseCase";

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_ids } = request.body;

    const createCarSpeficificationUseCase = container.resolve(
      CreateCarSpeficificationUseCase
    );

    const specificationsCar = await createCarSpeficificationUseCase.execute({
      car_id: id,
      specifications_ids,
    });

    return response.json(specificationsCar);
  }
}

export { CreateCarSpecificationController };

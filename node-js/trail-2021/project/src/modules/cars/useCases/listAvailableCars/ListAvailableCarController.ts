import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListAvailableCarUseCase } from "./ListAvailableCarUseCase";

class ListAvailableCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category_id, brand, name } = request.query;

    const listAvailableCarUseCase = container.resolve(ListAvailableCarUseCase);

    const cars = await listAvailableCarUseCase.execute({
      category_id: String(category_id),
      brand: String(brand),
      name: String(name),
    });

    return response.json(cars);
  }
}

export { ListAvailableCarController };

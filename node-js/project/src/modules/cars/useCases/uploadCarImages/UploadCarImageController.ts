import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params;
    const { filename: image_name } = request.file;

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const carImage = await uploadCarImagesUseCase.execute({
      car_id,
      image_name,
    });

    return response.json(carImage);
  }
}

export { UploadCarImageController };

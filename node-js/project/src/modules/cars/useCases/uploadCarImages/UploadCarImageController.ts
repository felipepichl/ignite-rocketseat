import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    uploadCarImagesUseCase.execute();

    return response.send();
  }
}

export { UploadCarImageController };

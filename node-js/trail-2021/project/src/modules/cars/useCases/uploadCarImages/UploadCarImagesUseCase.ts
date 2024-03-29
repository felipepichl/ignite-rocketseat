import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { injectable, inject } from "tsyringe";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image_name) => {
      await this.carImagesRepository.create({
        car_id,
        image_name,
      });
    });
  }
}

export { UploadCarImagesUseCase };

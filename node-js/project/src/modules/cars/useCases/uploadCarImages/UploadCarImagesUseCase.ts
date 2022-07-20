import { injectable, inject } from "tsyringe";

import { ICreateCarImagesDTO } from "@modules/cars/dtos/ICreateCarImagesDTO";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";

type IRequest = ICreateCarImagesDTO;

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository
  ) {}

  async execute({ car_id, image_name }: IRequest): Promise<CarImage> {
    const carImage = await this.carImagesRepository.create({
      car_id,
      image_name,
    });

    return carImage;
  }
}

export { UploadCarImagesUseCase };

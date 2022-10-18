import { ICreateCarImagesDTO } from "@modules/cars/dtos/ICreateCarImagesDTO";
import { CarImage } from "@modules/cars/infra/prisma/models/CarImage";

import { ICarImagesRepository } from "../ICarImagesRepository";

class CarImagesRepositoryInMemory implements ICarImagesRepository {
  private carsImage: CarImage[] = [];

  async create({ car_id, image_name }: ICreateCarImagesDTO): Promise<CarImage> {
    const carImage = new CarImage();

    Object.assign(carImage, { car_id, image_name });

    this.carsImage.push(carImage);

    return carImage;
  }
}

export { CarImagesRepositoryInMemory };

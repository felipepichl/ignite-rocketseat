import { ICreateCarImagesDTO } from "@modules/cars/dtos/ICreateCarImagesDTO";
import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";

import { prisma } from "@shared/infra/prisma";

import { CarImage } from "../models/CarImage";

class CarImagesRepository implements ICarImagesRepository {
  async create({ car_id, image_name }: ICreateCarImagesDTO): Promise<CarImage> {
    const result = await prisma.carImage.create({
      data: {
        fk_car_id: car_id,
        image_name,
      },
    });

    return result;
  }
}

export { CarImagesRepository };

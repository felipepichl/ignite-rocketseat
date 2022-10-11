import { ICreateCarImagesDTO } from "@modules/cars/dtos/ICreateCarImagesDTO";
import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { PrismaClient } from "@prisma/client";

import { CarImage } from "../models/CarImage";

class CarImagesRepository implements ICarImagesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create({ car_id, image_name }: ICreateCarImagesDTO): Promise<CarImage> {
    const result = await this.prisma.carImage.create({
      data: {
        fk_car_id: car_id,
        image_name,
      },
    });

    return result;
  }
}

export { CarImagesRepository };
